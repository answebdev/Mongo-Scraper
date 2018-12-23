// Grab the articles as a json
$.getJSON("/articles", function (data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + "<strong id='headline'>" + data[i].title + "</strong>" +
      "<br />" + "<span id='excerpt'>" + data[i].excerpt + "</span>" + "<br />" + "<a class='article-link' target='_blank' href="
      + data[i].link + ">" + data[i].link + "</a>" + "<br />" + "<span id='date'>" + data[i].date + "</span>" + "<p>" +
      "<button class='btn btn-primary save-button' dataId='" + data[i]._id + "' dataExcerpt='" + data[i].excerpt + "' datalink='" +
      data[i].link + "' dataDate='" + data[i].date + "' dataTitle='" + data[i].title + "' id='save-btn' name='{{this.id}}' type='submit'>Save Article</button>" +
      "<br />" + "<br />" + "<hr>" + "<br>");
  }
});

// Scrape and show articles in browser when clicking Scrape New Articles button
$(".scrape").on("click", function (event) {
  event.preventDefault();
  $("#article-card").show();
  $.getJSON("/scrape", function (data) {
    console.log(data);
  }).then(function (data) {
    // window.location.href = "/";
    $.append("/");
    // $("#article-card").val("");
    console.log("SCRAPE BUTTON CLICKED");
  });
});

$("#nav-scrape").on("click", function (event) {
  event.preventDefault();
  $("#article-card").show();
  $.getJSON("/scrape", function (data) {
    console.log(data);
  }).then(function (data) {
    // window.location.href = "/";
    $.append("/");
    // $("#article-card").val("");
    console.log("SCRAPE BUTTON CLICKED");
  });
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
  // data.preventDefault();
});

// Hide Scrape nav button when clicked Saved Articles button
$(".saved").on("click", function (data) {
  $("#nav-scrape").hide();
  // data.preventDefault();
});

// Save an article
$(document).on('click', '#save-btn', function (e) {
  // event.preventDefault();
  console.log(`CLICK EVENT ID: ${$(this).attr("dataId")}`)
  console.log(`CLICK EVENT TITLE: ${$(this).attr("dataTitle")}`)
  console.log(`CLICK EVENT EXCERPT: ${$(this).attr("dataExcerpt")}`)
  console.log(`CLICK EVENT LINK: ${$(this).attr("dataLink")}`)
  console.log(`CLICK EVENT DATE: ${$(this).attr("dataDate")}`)
  console.log("SAVE ARTICLE BUTTON CLICKED");
  var thisId = $(this).attr("dataId");
  var excerpt = $(this).attr("dataExcerpt");
  var title = $(this).attr("dataTitle");
  var link = $(this).attr("dataLink");
  var date = $(this).attr("dataDate");
  var data = {
    "data-id": thisId,
    "excerpt": excerpt,
    "headline": title,
    "article-link": link,
    "date": date
  };
  console.log("A R T I C L E  D A T A " + JSON.stringify(data));
  window.location.href = `/saved/${thisId}`;
  $("#savedArticle-card").show();

});





// // Whenever someone clicks a p tag
// $(document).on("click", "p", function () {
//   // Empty the notes from the note section
//   $("#notes").empty();
//   // Save the id from the p tag
//   var thisId = $(this).attr("data-id");

//   // Now make an ajax call for the Article
//   $.ajax({
//     method: "GET",
//     url: "/articles/" + thisId
//   })
//     // With that done, add the note information to the page
//     .then(function (data) {
//       // console.log(data);
//       // The title of the article
//       $("#notes").append("<h2>" + data.title + "</h2>");
//       // An input to enter a new title
//       $("#notes").append("<input id='titleinput' name='title' >");
//       // A textarea to add a new note body
//       $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
//       // A button to submit a new note, with the id of the article saved to it
//       $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

//       // If there's a note in the article
//       if (data.note) {
//         // Place the title of the note in the title input
//         $("#titleinput").val(data.note.title);
//         // Place the body of the note in the body textarea
//         $("#bodyinput").val(data.note.body);
//       }
//     });
// });

// // When you click the savenote button
// $(document).on("click", "#savenote", function () {
//   // Grab the id associated with the article from the submit button
//   var thisId = $(this).attr("data-id");

//   // Run a POST request to change the note, using what's entered in the inputs
//   $.ajax({
//     method: "POST",
//     url: "/articles/" + thisId,
//     data: {
//       // Value taken from title input
//       title: $("#titleinput").val(),
//       // Value taken from note textarea
//       body: $("#bodyinput").val()
//     }
//   })
//     // With that done
//     .then(function (data) {
//       // Log the response
//       console.log(data);
//       // Empty the notes section
//       $("#notes").empty();
//     });

//   // Also, remove the values entered in the input and textarea for note entry
//   $("#titleinput").val("");
//   $("#bodyinput").val("");
// });
