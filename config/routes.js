// var scrape = require("../scripts/scrape");
// var db = require("../models");
var Article = require("../models/Article");
var Note = require("../models/Note");
var headlinesController = require("../controllers/headlines");
var notesController = require("../controllers/notes");
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("../config/../models/Article");
var db = require("../config/../models/index");

// Routes
module.exports = function (router) {
    // This route renders the Index page
    router.get("/", function (req, res) {
        res.render("index");
    });

    // This route renders the Saved Articles page
    router.get("/saved", function (req, res) {
        res.render("saved");
    });

    // A GET route for scraping The Onion website
    router.get("/scrape", function (req, res) {
        // First, we grab the body of the html with axios
        axios.get("https://www.theonion.com/").then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);

            // Now, we grab every h2 within an article tag, and do the following:
            $("h1.headline").each(function (i, element) {
                // Save an empty result object
                var result = {};

                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this)
                    .children("a")
                    .text();
                result.date = $(this)
                    .next().find("time")
                    .attr("datetime");
                result.excerpt = $(this)
                    .parent().parent().find(".excerpt").text();
                result.link = $(this)
                    .children("a")
                    .attr("href");
                // result.image = $(this)
                // .children(".js_item-content").children("figure").children("a").children(".img-wrapper").children("picture").children("source").attr("data-srcset");

                // This route renders the Saved Handlebars page
                router.get("/saved/:id", function (req, res) {
                    console.log("INSIDE SAVED ROUTE");
                    let data;
                    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
                    db.Article.findOne({ _id: req.params.id })
                        // ..and populate all of the notes associated with it
                        // .populate("note")
                        .then(function (dbArticle) {
                            // If we were able to successfully find an Article with the given id, send it back to the client
                            data = dbArticle;
                            console.log(data)
                            console.log(`data: ${data}`);
                            return res.render("saved", { article: data }); // ES6 way is just { data }
                        })
                        .catch(function (err) {
                            // If an error occurred, send it to the client
                            return res.render("error", { err })
                        });
                });


                // Create a new Article using the `result` object built from scraping
                db.Article.create(result)
                    .then(function (dbArticle) {
                        res.JSON(dbArticle)
                        // View the added result in the console
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        // If an error occurred, log it
                        console.log(err);
                    });
            });

            // Send a message to the client
            res.send("Scrape Complete");
            console.log("\x1b[33m", "\n********************************************** Scrape Complete **********************************************\n");
        });
    });

    // Route for getting all Articles from the db
    router.get("/articles", function (req, res) {
        // Grab every document in the Articles collection
        db.Article.find({}).sort({ date: -1 })
            .then(function (dbArticle) {
                // If we were able to successfully find Articles, send them back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    // Route for getting all Articles from the db
    router.get("/articles/:id", function (req, res) {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        db.Article.findOne({ _id: req.params.id })
            .then(function (dbArticle) {
                // If we were able to successfully find an Article with the given id, send it back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    // Delete a specific article
    router.get("/delete/:id", function (req, res) {
        // Remove an article using the objectID
        db.Article.remove(
            {
                _id: mongojs.ObjectID(req.params.id)
            },
            function (error, removed) {
                console.log("A R T I C L E       D E L E T ED");
                // Log any errors from mongojs
                if (error) {
                    console.log(error);
                    res.send(error);
                }
                else {
                    // Otherwise, send the mongojs response to the browser
                    // This will fire off the success function of the ajax request
                    console.log(removed);
                    res.send(removed);
                }
            }
        );
    });




    // Create a new note
    router.post("/notes/save/:id", function (req, res) {
        // Create a new note and pass the req.body to the entry
        var newNote = new Note({
            body: req.body.text,
            article: req.params.id
        });
        console.log(req.body);
        console.log("NEW NOTE: " + newNote);
        // And save the new note the db
        newNote.save(function (error, note) {
            // Log any errors
            if (error) {
                console.log(error);
            }
            // Otherwise
            else {
                // Use the article id to find and update it's notes
                dbArticle.findOneAndUpdate({ "_id": req.params.id }, { $push: { "notes": note } })
                    // Execute the above query
                    .exec(function (err) {
                        // Log any errors
                        if (err) {
                            console.log(err);
                            res.send(err);
                        }
                        else {
                            // Or send the note to the browser
                            res.send(note);
                            // console.log(note);
                        }
                    });
            }
        });
    });


    //Post new notes to articles
    // router.post("/api/notes", function (req, res) {
    //     dbArticle.save(req.body, function (data) {
    //         res.json(data);
    //     });
    // });

    // Update the articles
    router.patch("/api/articles", function (req, res) {
        dbArticle.update(req.body, function (err, data) {
            res.json(data);
        });
    });


}



    // Get route to return all saved articles
    // router.get("/saved/all", function (req, res) {
    //     Save.find({})
    //         .populate("note")
    //         .exec(function (error, data) {
    //             if (error) {
    //                 console.log(error);
    //                 res.json({"code" : "error"});
    //             } else {
    //                 res.json(data);
    //             }
    //         });
    // });

    // Post route to save the article
    // router.post("/saved", function (req, res) {
    //     var result = {};
    //     result.id = req.body._id;
    //     result.excerpt = req.body.excerpt;
    //     result.title = req.body.title;
    //     result.link = req.body.link;
    //     result.date = req.body.date;
    //     // Save these results in an object that we'll push into the results array
    //     var entry = new Save(result);
    //     // Now, save that entry to the db
    //     entry.save(function (err, doc) {
    //         // Log any errors
    //         if (err) {
    //             console.log(err);
    //             res.json(err);
    //         }
    //         // Or log the doc
    //         else {
    //             res.json(doc);
    //         }
    //     });
    //     // console.log("R E S U L T: " + result);
    //     //res.json(result);
    // });


    // router.put('/saved', (req, res) => {

    //     let id = req.body.id;
    //     let isSaved = req.body.saved;
    //     db.Article.updateOne(
    //       { _id: id },
    //       { saved: isSaved },
    //       (err, doc) => {
    //         if (err) {
    //           console.log(err)
    //         } else {
    //           console.log(doc);
    //         }
    //       }
    //      )
    //      .then(() => {
    //        res.send(true);
    //      });

    //   });


    // Route for grabbing a specific Article by id, populate it with it's note
    // router.get("/articles/:id", function (req, res) {
    //     // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    //     db.Article.findOne({ _id: req.params.id })
    //         // ..and populate all of the notes associated with it
    //         .populate("note")
    //         .then(function (dbArticle) {
    //             // If we were able to successfully find an Article with the given id, send it back to the client
    //             res.json(dbArticle);
    //         })
    //         .catch(function (err) {
    //             // If an error occurred, send it to the client
    //             res.json(err);
    //         });
    // });

    // // Route for saving/updating an Article's associated Note
    // router.post("/articles/:id", function (req, res) {
    //     // Create a new note and pass the req.body to the entry
    //     db.Note.create(req.body)
    //         .then(function (dbNote) {
    //             // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
    //             // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
    //             // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
    //             return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    //         })
    //         .then(function (dbArticle) {
    //             // If we were able to successfully update an Article, send it back to the client
    //             res.json(dbArticle);
    //         })
    //         .catch(function (err) {
    //             // If an error occurred, send it to the client
    //             res.json(err);
    //         });
    // });
