$(function() {
  liveButtons(searchArray, 'searchButton', '#buttonsArea');
  console.log("page is loaded")
})

var searchArray = ['Cat', 'Sailor Moon', 'Dragon Ball Z'];

function liveButtons(searchArray, classToAdd, addToArea) {
  $(addToArea).empty();
  for (var i = 0; i<searchArray.length; i++){
    var a = $('<button>');
    a.addClass(classToAdd);
    a.attr('data-type', searchArray[i]);
    a.text(searchArray[i]);
    $(addToArea).append(a);
  }
}

$(document).on('click', '.searchButton', function(){
  var type = $(this).data('type');
  console.log(type);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +type+ "&api_key=UCe8Ofw7hwzlFoW2FhU00KLGDZzCndAD&limit=10";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    
    for (var i=0; i<response.data.length; i++) {
      var searchSec = $('<div class="search-for-item">');
      var rating = response.data[i].rating;
      var ptag = $('<p>').text('Rating: ' +rating);
      var animate = response.data[i].images.fixed_height.url; 
      var still = response.data[i].images.fixed_height_still.url; 
      var image = $('<img>');
      image.attr('src', still);
      image.attr('data-still', still);
      image.attr('data-animated', animate);
      image.attr('data-state', 'still');
      image.addClass('searchImage');
      searchSec.append(ptag);
      searchSec.append(image);
      $('#searches').append(searchSec);

    }
  });

})
$(document).on('click', '.searchImage', function(){
  var state = $(this).attr('data-state');
  if (state == "still") {
    $(this).attr('src', $(this).data('animated'));
    $(this).attr('data-state', 'animated');
  }
  else {
    $(this).attr('src', $(this).data('still'));
    $(this).attr('data-state', 'still');

  }
})

$('#submit').on('click', function(event){
  console.log("something");
  event.preventDefault();
  console.log("some");
  var newSearch = $('#search-input').val().trim();
  searchArray.push(newSearch);
  liveButtons(searchArray, 'searchButton', '#buttonsArea');
  // liveButtons();
  // return false;
})





   