var shortid = require('shortid')
var express = require('express');
var mongoose = require('mongoose')
var validator = require('validator')
var app = express();

var Url = require('./models/url')

mongoose.connect('mongodb://localhost/adrian-short-url')

app.get('/', function(req, res) {
  res.send({
    success: true,
    msg: 'This server is working now'
  })
})

// localhost:3000/create/http://google.com
app.get('/create/*?', function(req, res) {
  var url = req.params[0]

  // validator.isUrl(url) => boolean
  Url.findOne({ originalUrl: url }, function(err, result) {
    if (err) return res.send({ success: false, msg: 'Error reaading from db', error: err })
    if (result) {
      return res.send(result)
    }
    var shortCode = shortid.generate();
    var newShortUrl = new Url({
      originalUrl: url,
      shortCode: shortCode,
      shortenedUrl: 'localhost:3000/' + shortCode
    })
    newShortUrl.save(function(err) {
      if (err) return res.send({ success: false, msg: 'error writing to database' })
      res.send(newShortUrl)
      // res.redirect()
    })
  })
})

app.listen(3000, function() {
  console.log('Express server is running');
});

// User story #1 - Produce JSON response with original and shortened shortned url
// #2 -- Persist all requests to a mongodb database
// #3 -- if a user enters shortened url, redirect to the original url
