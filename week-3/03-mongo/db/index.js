const mongoose = require("mongoose");
const mongodb_url =
  "mongodb+srv://madhavan:PCNZJW0PE3YF19m7@cluster0.bfozyft.mongodb.net/";
// Connect to MongoDB
mongoose.connect(mongodb_url);

// Define schemas
const AdminSchema = new mongoose.Schema({
  // Schema definition here
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  // Schema definition here
  username: String,
  password: String,
  coursePurchased: [{ type: mongoose.Schema.Types.ObjectId, red: "Course" }],
});

const CourseSchema = new mongoose.Schema({
  // Schema definition here
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
