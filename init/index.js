const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

main()
  .then(() => console.log("DB is connected"))
  .catch(err => console.log(err));



const initDB = async() =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({
      ...obj, owner: "697521a20d125497fe392002", }))
    await Listing.insertMany(initData.data);
    console.log("data inserted")
}

initDB();