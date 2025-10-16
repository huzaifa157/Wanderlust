const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");

main().then(()=> console.log("DB is connected")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

}

app.get("/" , (req,res)=>{
    res.send("server is there")
})

app.get("/testListing" , async(req ,res)=>{
    let sampleListing = new Listing({
        title: "My new villa",
        description : "by the beach",
        price:120000,
        location : "islamabad , F9",
        country : "Pakistan"

    });
 
    await sampleListing.save();
    res.send(sampleListing);

})




app.listen(8080, ()=>{
    console.log("server is running")
})