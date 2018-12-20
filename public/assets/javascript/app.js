// Grab the articles as a json
$.getJSON("/articles", function (data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + "<strong>" + data[i].title + "</strong>" +
      "<br />" + data[i].excerpt + "<br />" + data[i].link + "<br />" + data[i].date + "<p>" +
      "<button class='btn btn-primary save-button' id='save-btn' name='{{this.id}}' type='submit'>Save Article</button>" +
      "<br />" + "<br />" + "<hr>" + "<br>");
  }
});

// Show articles when clicking Scrape New Articles button
$(".scrape").on("click", function (data) {
  $("#article-card").show();
  // $("#article-card").val("");
  console.log("SCRAPE BUTTON CLICKED");
  data.preventDefault();
});

// Clear articles when clicking Clear Articles button
$(".clear").on("click", function (data) {
  $("#article-card").empty();
  // $("#article-card").val("");
  console.log("CLEAR BUTTON CLICKED");
  data.preventDefault();
});

// Show message when clicking Clear Articles button
$(".clear").on("click", function (data) {
  $("#none").show();
  console.log("WAITING FOR MESSAGE");
  data.preventDefault();
});

// Show Question Card when clicking Clear Articles button
$(".clear").on("click", function (data) {
  $("#question-card").show();
  console.log("WAITING FOR MESSAGE");
  data.preventDefault();
});

// Hide Scrape nav button when clicked Saved Articles button
$("#nav-saved").on("click", function (data) {
  $("#nav-scrape").hide();
  // console.log("WAITING FOR MESSAGE");
  data.preventDefault();
});

// Hide Scrape nav button when clicked Saved Articles button
$(".saved").on("click", function (data) {
  $("#nav-scrape").hide();
  // console.log("WAITING FOR MESSAGE");
  data.preventDefault();
});

// Whenever someone clicks a p tag
$(document).on("click", "p", function () {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function (data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});


// articlePanel(article);

//   function articlePanel(article) {
//       var panel =
//         $(["<div class='panel panel-default'>",
//             "<div class='panel-heading'>"]),
//             // "<h3>",
//             result.title,
//             "<a class='btn btn-success save'>",
//             "Save Article",
//             "</a>",
//             "</h3>",
//             "<div>",
//             "<div class='panel-body'>",
//             result.excerpt,
//             "</div>",
//             "</div>"
//   ].join(""));
//   panel.data("_id", result._id);
//   return panel;
//   }