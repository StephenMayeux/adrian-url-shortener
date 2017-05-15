var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema({
  originalUrl: String,
  shortCode: String,
  shortenedUrl: String
}, { timestamps: true })

var ModelClass = mongoose.model('url', urlSchema)
module.exports = ModelClass;
