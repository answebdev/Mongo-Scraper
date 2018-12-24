var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
// Require Note and Article models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

// Scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var models = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Set Handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var router = express.Router();

// Require routes file pass router object
require("./config/routes")(router);

// Have every request go through router middleware
app.use(router);




// var connectionString = "mongodb://localhost/onionscraperdb";

// if(process.env.process.env.MLAB_USERNAME_WEBDEV) {
//   var username = process.env.MLAB_USERNAME_WEBDEV;
//   var password = process.env.MLAB_PASSWORD_WEBDEV;
//   connectionString = "mongodb://" + username + ":" + password;
//   connectionString += "@ds119113.mlab.com:19113/heroku_z4pc1jc3";
// }

// var db = mongoose.connect(connectionString);

// module.exports = db;




// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var db = process.env.MONGODB_URI || "mongodb://localhost/onionscraperdb";

mongoose.connect(db, function (error) {
  if (error) {
    console.log(error);
  }
  else {
    console.log("Mongoose connection is successful");
  }
});




// var databaseUri = "mongodb://localhost/onionscraperdb";
// // This executes if this is being executed in the Heroku app
// if (process.env.MONGODB_URI) {
//   mongoose.connect(process.env.MONGODB_URI);
// } else {
// // This executes if this is being executed on local machine
// } mongoose.connect(databaseUri);

// var db = mongoose.connection;

// // Show any Mongoose errors
// db.on("error", function(err) {
//   console.log("Mongoose Error: ", err);
// });

// // Once logged in to the db through Mongoose, log to a success message
// db.once("open", function() {
//   console.log("Mongoose connection is successful.");
// });

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
