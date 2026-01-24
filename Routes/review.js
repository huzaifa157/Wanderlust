const express = require("express");
const router = express.Router({mergeParams:true});
const { reviewSchema } = require("../schema");
const review = require('../models/review');
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError")


const validateReview = (req , res, next)=>{
    let {error} =  reviewSchema.validate(req.body); /* deconstructing error from the result of reviewSchema */
    if(error){
        throw new ExpressError(400,  "Validation Error: Please provide complete and correct information.")
    }else{
        next();
    }
}

// review 

router.post("/", validateReview, wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let newReview = new review(req.body);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New Review successfully Added")

    res.redirect(`/listings/${listing._id}`)

}))

// delete review 
router.delete("/:reviewId", wrapAsync(async(req,res)=>{
  let {id, reviewId} = req.params;
   await review.findByIdAndDelete(reviewId);
   await Listing.findByIdAndUpdate(id, {$pull: {reviews : reviewId}})

   req.flash("success", " Review successfully deleted")

   res.redirect(`/listings/${id}`)

    
}));

module.exports = router;