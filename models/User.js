const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  themes: {
    type: [String],
    required: true,
  },
  profileImage: {
    type: String, // Assuming you store the image URL as a string
    default: "" // You can set a default value if needed
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  console.log("Just before saving before hashing:", user.password);
  if (!user.isModified("password")) {
    return next();
  }
  user.password = await bcrypt.hash(user.password, 8);
  console.log("Just before saving & after hashing:", user.password);
  next();
});

mongoose.model("User", UserSchema);