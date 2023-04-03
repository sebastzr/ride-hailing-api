const { Schema, model } = require("mongoose");

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Driver", "Rider"],
  },
  status: {
    type: String,
    enum: ["idle", "on-ride"],
  },
});

module.exports = model("User", userSchema);
