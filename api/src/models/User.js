const { Schema, model } = require("mongoose");
const { emailValidator } = require("../utils");

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: emailValidator,
      message: "Invalid email address",
    },
  },
  type: {
    type: String,
    enum: ["Driver", "Rider"],
    required: true,
  },
  status: {
    type: String,
    enum: ["idle", "on-ride"],
    required: true,
  },
});

module.exports = model("User", userSchema);
