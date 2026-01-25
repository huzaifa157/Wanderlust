const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const {validateReview, isloggedIn, isAuthor} = require("../middleware")
const reviewController = require("../Controllers/review")



// create review 
router.post("/", isloggedIn, validateReview, wrapAsync(reviewController.createReview))


// delete review 
router.delete("/:reviewId", isloggedIn,isAuthor, wrapAsync(reviewController.deleteReview));


module.exports = router;