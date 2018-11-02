var mongoose = require("mongoose");
var urlSchema = new mongoose.Schema({
  url: String,
  hexRes: String
});
module.exports = mongoose.model("urlmin", urlSchema);
