const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError")
const {listingSchema  } = require("../schema");
const {isloggedIn} = require("../middleware")



const validateListing = (req , res, next)=>{
    let {error} = listingSchema.validate(req.body); /* deconstructing error from the result of listingSchema */
    if(error){
        throw new ExpressError(400,  "Validation Error: Please provide complete and correct information.")
    }else{
        next();
    }
}

// index route 

router.get("/", async (req ,res)=>{
    const allListings = await Listing.find({});
    res.render("listing/index" , {allListings})
})


// new route 
router.get("/new",isloggedIn ,(req,res)=>{
    res.render("listing/new")
})


// create route 
router.post("/" ,isloggedIn , validateListing , wrapAsync( async(req,res)=>{

    let {title,description,image,price,location,country} = req.body;

    const newlisting = new Listing({
        title ,
         description,
         image: {filename: "listingimage" , url: image}, 
         price,
         location,
          country,
    });
    newlisting.owner = req.user._id;
   await newlisting.save();
   req.flash("success", "New Listing successfully Added")
   res.redirect("/listings")


}))

// EDIT route — show the edit form
router.get("/:id/edit" ,isloggedIn, wrapAsync( async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
     if(!listing){
        req.flash("error","This List does not exist!")
        return res.redirect("/listings")
    }
    res.render("listing/edit", { listing });
}));

// UPDATE route — apply edits and redirect
router.put("/:id",isloggedIn , validateListing , wrapAsync( async (req, res) => {
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
  req.flash("success", " Listing successfully updated")
  res.redirect(`/listings/${id}`);
}));



router.delete("/:id/delete" ,isloggedIn, wrapAsync( async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", " Listing successfully deleted")
    res.redirect("/listings")
}))


// show route 

router.get("/:id", wrapAsync( async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews").populate("owner");
    if(!listing){
        req.flash("error","List does not exist!")
        return res.redirect("/listings")
    }
    res.render("listing/show" , {listing});

}))

module.exports = router; 
