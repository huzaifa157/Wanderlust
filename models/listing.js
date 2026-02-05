const mongoose = require("mongoose");
const review = require("./review");
const { required } = require("joi");
const schema = mongoose.Schema;

const listingSchema = new schema({
    title : {
        type : String,
        required : true,
    },
    description : String,
    image: {
    filename: {
      type: String,
      default: "listingimage"
    },
    url: String,
  },

    price : Number,
    location : String,
    country : String,
    reviews:[
      {
        type: schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    owner:{
      type: schema.Types.ObjectId,
      ref: "User"
    },
    geometry:{
      type:{
        type:String,
        enum: ['Point'],
        required:true
      },
      coordinates:{
        type: [Number],
        required: true
      }
    }



});


listingSchema.post("findOneAndDelete", async(listing)=>{
  if(listing){
    await review.deleteMany({_id: {$in: listing.reviews}})
  }
})

const Listing =  mongoose.model("Listing" , listingSchema);
module.exports = Listing;