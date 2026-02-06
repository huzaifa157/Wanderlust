const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isloggedIn, isOwner, validateListing } = require("../middleware");
const ListingController = require("../Controllers/listing")
const multer  = require('multer')
const {storage} = require("../CloudConfig")
const upload = multer({ storage:storage })


router.get("/search", wrapAsync( ListingController.searchListings));


router.route("/")
.get( wrapAsync(ListingController.index))   // render index listing route 
.post( isloggedIn, upload.single("image"), validateListing, wrapAsync(ListingController.createListings)); // create listing routes 


router.get("/new", isloggedIn, ListingController.renderNewEjs); // new route 


router.route("/:id")
.put( isloggedIn, isOwner, upload.single("image"), validateListing, wrapAsync(ListingController.updateListings)) // UPDATE route — apply edits and redirect
.get( wrapAsync(ListingController.showListings)) // show route 
.delete(isloggedIn, isOwner, wrapAsync(ListingController.destroyListings)); // destroy route


router.get("/:id/edit", isloggedIn, isOwner, wrapAsync(ListingController.renderEditEjs));// EDIT route — show the edit form




module.exports = router; 
