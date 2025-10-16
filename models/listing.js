const mongoose = require("mongoose");

const schema = mongoose.Schema;

const listingSchema = new schema({
    title : {
        type : String,
        required : true,
    },
    description : String,
    image : {
        type : String,
        default : "https://unsplash.com/photos/white-bed-linen-with-throw-pillows-Yrxr3bsPdS0",
        set : (v) => v ===""? "https://unsplash.com/photos/white-bed-linen-with-throw-pillows-Yrxr3bsPdS0" : v,

    },
    price : Number,
    location : String,
    country : String,
});


const Listing =  mongoose.model("Listing" , listingSchema);
module.exports = Listing;