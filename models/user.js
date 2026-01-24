const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

/*Key part:

passport-local-mongoose adds extra things to your schema automatically:

username
hash (for password)
salt (for password)
authenticate() function

So when you write User.authenticate(), you are calling the authenticate function that passport-local-mongoose added to your User model.
This function knows how to check the username and password against the database. You don’t have to manually write findOne({username}) and compare the hashed password.
*/

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
  }
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email"});     /*// This adds username, hash & salt fields, and the authenticate method*/



module.exports = mongoose.model("User", UserSchema);
