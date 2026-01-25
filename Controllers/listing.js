const Listing = require("../models/listing")


module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listing/index", { allListings })
}


module.exports.renderNewEjs = (req, res) => {
    res.render("listing/new")
}


module.exports.createListings = async (req, res) => {

  let { title, description, image, price, location, country } = req.body;
    const newlisting = new Listing({
        title,
        description,
        image: { filename: "listingimage", url: image },
        price,
        location,
        country,
    });
    newlisting.owner = req.user._id;
    await newlisting.save();
    req.flash("success", "New Listing successfully Added")
    res.redirect("/listings")
}



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
    let { id } = req.params;
    let { title, description, image, price, location, country } = req.body;
    const updatedListing = {
        title,
        description,
        image: { filename: "listingimage", url: image }, //  properly set nested object
        price,
        location,
        country,
    };
    await Listing.findByIdAndUpdate(id, updatedListing);
    req.flash("success", " Listing successfully updated")
    res.redirect(`/listings/${id}`);
}



module.exports.showListings = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({
    path: "reviews", populate: { path: "author", select: "username" } // only select username
  }).populate("owner", "username");

    if(!listing){
        req.flash("error","List does not exist!")
        return res.redirect("/listings")
    }
    res.render("listing/show" , {listing});
}



module.exports.destroyListings =  async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", " Listing successfully deleted")
    res.redirect("/listings")
}