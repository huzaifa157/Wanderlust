const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isloggedIn, isOwner, validateListing } = require("../middleware");
const ListingController = require("../Controllers/listing")


router.route("/")
.get( wrapAsync(ListingController.index))   // render index listing route 
.post( isloggedIn, validateListing, wrapAsync(ListingController.createListings)); // create listing route 


router.get("/new", isloggedIn, ListingController.renderNewEjs); // new route 


router.route("/:id")
.put( isloggedIn, isOwner, validateListing, wrapAsync(ListingController.updateListings)) // UPDATE route — apply edits and redirect
.get( wrapAsync(ListingController.showListings)); // show route 


router.get("/:id/edit", isloggedIn, isOwner, wrapAsync(ListingController.renderEditEjs));// EDIT route — show the edit form


router.delete("/:id/delete", isloggedIn, isOwner, wrapAsync(ListingController.destroyListings)) // destroy route


module.exports = router; 
