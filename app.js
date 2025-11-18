const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync")
const ExpressError = require("./utils/ExpressError")
const {listingSchema, validate} = require("./schema");

main().then(()=> console.log("DB is connected")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

}

app.set("view engine" , "ejs");
app.engine("ejs" , ejsMate);
app.set("views" , path.join(__dirname, "views"))
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")))



const validateListing = (req , res, next)=>{
    let {error} = listingSchema.validate(req.body); /* deconstructing error from the result of listingSchema */
    if(error){
        throw new ExpressError(400,  "Validation Error: Please provide complete and correct information.")
    }else{
        next();
    }

}


app.get("/" , (req,res)=>{
    res.send("server is there")
})



// index route 

app.get("/listings", async (req ,res)=>{
    const allListings = await Listing.find({});
    res.render("listing/index" , {allListings})
})


// new route 
app.get("/listings/new" ,(req,res)=>{
    res.render("listing/new")
})


// create route 
app.post("/listings", validateListing , wrapAsync( async(req,res)=>{

    let {title,description,image,price,location,country} = req.body;

    const newlisting = new Listing({
        title ,
         description,
         image: {filename: "listingimage" , url: image,}, 
         price,
         location,
          country,
    });

   await newlisting.save();
   res.redirect("/listings")


}))

// EDIT route — show the edit form
app.get("/listings/:id/edit", wrapAsync( async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listing/edit", { listing });
}));

// UPDATE route — apply edits and redirect
app.put("/listings/:id", validateListing , wrapAsync( async (req, res) => {
  let { id } = req.params;
  let { title, description, image, price, location, country } = req.body;

  const updatedListing = {
    title,
    description,
    image: { filename: "listingimage", url: image }, // ✅ properly set nested object
    price,
    location,
    country,
  };

  await Listing.findByIdAndUpdate(id, updatedListing);
  res.redirect(`/listings/${id}`);
}));



app.delete("/listings/:id/delete" , wrapAsync( async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings")
}))


// show route 

app.get("/listings/:id", wrapAsync( async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listing/show" , {listing});

}))








app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.msg || "Something went wrong!";
  res.status(status).render("listing/error.ejs" , {message , status});
});


app.listen(8080, ()=>{
    console.log("server is running")
})

