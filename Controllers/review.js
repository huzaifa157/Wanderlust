const review = require('../models/review');
const Listing = require("../models/listing");


module.exports.createReview = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let newReview = new review(req.body);
     newReview.author = req.user._id;
    listing.reviews.push(newReview);
        
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review successfully Added")

    res.redirect(`/listings/${listing._id}`)
}



module.exports.deleteReview = async(req,res)=>{
  let {id, reviewId} = req.params;
   await review.findByIdAndDelete(reviewId);
   await Listing.findByIdAndUpdate(id, {$pull: {reviews : reviewId}})

   req.flash("success", " Review successfully deleted")

   res.redirect(`/listings/${id}`)

    
}