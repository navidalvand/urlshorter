const mongoose = require("mongoose");

const URLSchema = new mongoose.Schema({
  URL: { type: String, required: true },
});

const URLModel = mongoose.model("url", URLSchema);

module.exports = {
  URLModel,
};
