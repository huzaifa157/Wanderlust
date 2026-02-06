const Listing = require("../models/listing")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAPBOX_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


module.exports.searchListings = async (req, res) => {
  const { searchQuery } = req.query; // matches your input name
  let filter = {};

  if (searchQuery) {
    // Search by title OR country (case-insensitive)
    filter = {
      $or: [
        { title: { $regex: searchQuery, $options: "i" } },
        { country: { $regex: searchQuery, $options: "i" } }
      ]
    };
  }
  const allListings = await Listing.find(filter);
  res.render("listing/index", { allListings, searchQuery });
};




module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listing/index", { allListings })
}


module.exports.renderNewEjs = (req, res) => {
    res.render("listing/new")
}

module.exports.createListings = async (req, res) => {
  try {
    const { title, description, price, location, country } = req.body;


    if (!req.file) {
      req.flash("error", "Please upload an image");
      return res.redirect("/listings/new");
    }

    //  Geocode location FIRST
    const geoResponse = await geocodingClient
      .forwardGeocode({
        query: location,
        limit: 1
      })
      .send();

    if (!geoResponse.body.features.length) {
      req.flash("error", "Invalid location");
      return res.redirect("/listings/new");
    }

    const newListing = new Listing({
      title,
      description,
      price,
      location,
      country,
      image: {
        url: req.file.secure_url,
        filename: req.file.filename,
      },
      geometry: {
        type: "Point",
        coordinates: geoResponse.body.features[0].geometry.coordinates
      }
    });

    newListing.owner = req.user._id;
    await newListing.save();

    req.flash("success", "New Listing successfully added");
    res.redirect("/listings");

  } catch (err) {
    console.log(err);
    req.flash("error", "Error creating listing");
    res.redirect("/listings/new");
  }
};



module.exports.renderEditEjs = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "This List does not exist!")
        return res.redirect("/listings")
    }
    res.render("listing/edit", { listing });
}


module.exports.updateListings = async (req, res) => {
    try {
        const { id } = req.params;
        let { title, description, price, location, country } = req.body;
        const updatedListing = { title, description, price, location, country };
         
          
  console.log(req.file)
        // Only update image if new file uploaded
        if (req.file) {
            updatedListing.image = {
                url: req.file.secure_url,
                filename: req.file.filename
            };
        }
        // Use Mapbox Geocoding to get coordinates for the new location
       if (location) {
    const geoResponse = await geocodingClient
        .forwardGeocode({
            query: location,
            limit: 1
        })
        .send();

    if (
        geoResponse.body &&
        geoResponse.body.features &&
        geoResponse.body.features.length > 0
    ) {
        updatedListing.geometry = {
            type: "Point",
            coordinates: geoResponse.body.features[0].geometry.coordinates
        };
    }
}

        await Listing.findByIdAndUpdate(id, updatedListing);

        req.flash("success", "Listing successfully updated");
        res.redirect(`/listings/${id}`);
    } catch (err) {
        console.log(err);
        req.flash("error", "Error updating listing");
        res.redirect(`/listings/${id}`);
    }
};





module.exports.showListings = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({
    path: "reviews", populate: { path: "author", select: "username" } // only select username
  }).populate("owner", "username");

    if(!listing){
        req.flash("error","List does not exist!")
        return res.redirect("/listings")
    }
    res.render("listing/show" , {listing, mapToken: process.env.MAPBOX_TOKEN});
}



module.exports.destroyListings =  async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", " Listing successfully deleted")
    res.redirect("/listings")
}