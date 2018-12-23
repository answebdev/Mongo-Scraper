// Grab the articles as a json
$.getJSON("/articles", function (data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + "<strong id='headline'>" + data[i].title + "</strong>" +
      "<br />" + "<span id='excerpt'>" + data[i].excerpt + "</span>" + "<br />" + "<a class='article-link' target='_blank' href="
      + data[i].link + ">" + data[i].link + "</a>" + "<br />" + "<span id='date'>" + data[i].date + "</span>" + "<p>" +
      "<button class='btn btn-primary save-button' dataId='" + data[i]._id + "' dataExcerpt='" + data[i].excerpt + "' datalink='" + data[i].link + "' dataDate='" + data[i].date + "' dataTitle='" + data[i].title + "' id='save-btn' name='{{this.id}}' type='submit'>Save Article</button>" +
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




// Click on Save Article button
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
  // console.log("WINDOW LOcATION");
  // $.getJSON(`/articles/${thisId}`, function (data) {
  //   console.log("THIS IS THE DATA: " + data);
  //   // Display the apropos information on the page
  //   $("#savedArticle").append("<p data-id='" + data[i]._id + "'>" + "<strong id='headline'>" + data[i].title + "</strong>" +
  //     "<br />" + "<span id='excerpt'>" + data[i].excerpt + "</span>" + "<br />" + "<a class='article-link' target='_blank' href="
  //     + data[i].link + ">" + data[i].link + "</a>" + "<br />" + "<span id='date'>" + data[i].date + "</span>" + "<p>" +
  //     "<button class='btn btn-primary save-button' dataId='" + data[i]._id + "' dataExcerpt='" + data[i].excerpt + "' datalink='" + data[i].link + "' dataDate='" + data[i].date + "' dataTitle='" + data[i].title + "' id='save-btn' name='{{this.id}}' type='submit'>Save Article</button>" +
  //     "<br />" + "<br />" + "<hr>" + "<br>");
  $("#savedArticle-card").show();

});





// $("#saved").click(function() {
//   var articleToSave = {};
//   articleToSave.id = $(this).data("id");
//   articleToSave.saved = true;
//   $.ajax({
//       method: "PATCH",
//       url: "/api/articles",
//       data: articleToSave
//   }).then(function(data) {
//       location.reload();
//   });
// });



// $(document).on('click', '#save-btn', function(e) {
//   e.preventDefault();
//   var id = $(this).data('id');  
//   $.ajax({
//     url: '/saved',
//     type: 'put',
//     data: { id: id, saved: true },
//     success: function(res) {
//       if (res) {
//         console.log('article saved');
//         alert('article saved');
//       }
//     },
//     error: function(err) {
//       console.log(err);
//     }
//   });
// });






// $(document).on('click', '#save-btn', function(e) {
//   e.preventDefault();
//   var id = $(this).data('id');  
//   $.ajax({
//     url: '/saved/' + id,
//     type: 'POST',
//     data: { id: id, saved: true },
//     success: function(res) {
//       if (res) {
//         console.log('A R T I C L E  S A V E D');
//         alert('article saved');
//       }
//     },
//     error: function(err) {
//       console.log(err);
//     }
//   });
// });


// $(document).on("click", "#save-btn", saveArticle);

// function saveArticle() {
//   console.log("BUTTON CLICKED");
//   var articleToSave = $(this).data();
//   articleToSave.saved = true;

//   $.ajax({
//     method: "POST",
//     url: "/saved",
//     data: articleToSave
//   })
//   .then(function(data) {
//     // if(data.ok) {

//       console.log("OKAY!");
//       $.getJSON("/saved");


//     // }
//   });
// }

// When you click save-article
// $(document).on("click", "#save-btn", function() {
//   console.log("SAVE ARTICLE BUTTON CLICKED");
//   // Grab the id associated with the article from the delete button
//   var thisId = $(this).attr("data-id");

//   // Run POST method
//   $.ajax({
//       method: "POST",
//       url: "/saved",
//     })
//     // With that done...
//     .done(function(data) { // refresh the page
//     console.log("article saved: " + data);
//      // location.reload();
//     });

// });

// var articleContainer = $(".article-container");
//   $(document).on("click", "#save-btn", saveArticle);

// function saveArticle() {
//   // This function is triggered when the user wants to save an article
//   // When we rendered the article initially, we attatched a javascript object containing the headline id
//   // to the element using the .data method. Here we retrieve that.
//   var articleToSave = $(this)
//     .parents("#articles")
//     .data();
//   // articleToSave.saved = true;
//   // Using a patch method to be semantic since this is an update to an existing record in our collection
//   $.ajax({
//     method: "POST",
//     url: "/saved/" + articleToSave._id,
//     data: articleToSave
//   }).then(function(data) {
//     // If the data was saved successfully
//     if (data.saved) {
//       // Run the initPage function again. This will reload the entire list of articles
//       // initPage();
//       console.log("ARTICLE HAS BEEN SAVED");
//     }
//   });
// }




// Once the page is ready, run the initPage function to kick things off
// initPage();

//   function initPage() {
//     // Empty the article container, run an AJAX request for any unsaved headlines
//     articleContainer.empty();
//     $.get("/api/headlines?saved=false").then(function(data) {
//       // If we have headlines, render them to the page
//       if (data && data.length) {
//         renderArticles(data);
//       }
//       else {
//         // Otherwise render a message explaing we have no articles
//         renderEmpty();
//       }
//     });
//   }



// When you click the Save Article button
// $(document).on("click", "#save-btn", function() {
//   $(this).addClass("disabled");
//   var thisId = $(this).attr("data-id");
//   console.log(thisId);

//   $.ajax({
//     method: "POST",
//     url: "/saved/" + thisId,

//   })

//   .done(function(data) {
//       console.log(data);
//   });
// });





//click event to save an article
// $(document).on('click', '#save-btn', function (e) {
//   console.log("SAVE ARTICLE BUTTON CLICKED");
//   $("#article-card").show();
//   let articleId = $(this).data('id');
//   $.ajax({
//     url: '/saved',
//     type: 'GET',
//     success: function (response) {
//       window.location.href = '/saved';
//     },
//     error: function (error) {
//       showErrorModal(error);
//     }
//   });
// });











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
      // console.log(data);
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
