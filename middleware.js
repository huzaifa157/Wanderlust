const Listing = require("./models/listing");
const Review = require("./models/review")
const ExpressError = require("./utils/ExpressError")
const {listingSchema,reviewSchema  } = require("./schema");



module.exports.validateListing = (req , res, next)=>{
    let {error} = listingSchema.validate(req.body); /* deconstructing error from the result of listingSchema */
    if(error){
        throw new ExpressError(400,  "Validation Error: Please provide complete and correct information.")
    }else{
        next();
    }
}


module.exports.validateReview = (req , res, next)=>{
    let {error} =  reviewSchema.validate(req.body); /* deconstructing error from the result of reviewSchema */
    if(error){
        throw new ExpressError(400,  "Validation Error: Please provide complete and correct information.")
    }else{
        next();
    }
}


module.exports.isloggedIn = (req,res,next) =>{

   if(! req.isAuthenticated()){

        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in first!");
      return  res.redirect("/login")
    }
     next();

}


module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
}
next();
}


module.exports.isOwner = async (req,res,next)=>{
  const { id } = req.params;

   let listing = await Listing.findById(id)
    if(!listing.owner._id.equals(res.locals.currUser._id)){
      req.flash("error" , "you are not the owner of the listing!")
      return  res.redirect(`/listings/${id}`);
    }
  next();
}


module.exports.isAuthor = async (req,res,next)=>{
  const { id, reviewId } = req.params;

   let review = await Review.findById(reviewId)
    if(!review.author._id.equals(res.locals.currUser._id)){
      req.flash("error" , "you are not the author of the review!")
      return  res.redirect(`/listings/${id}`);
    }
  next();
}