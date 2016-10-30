"use strict";

//Slider settings
$(function(){
  $('.slick-item').slick({
    arrows: true,
    speed: 500,
  });
});


//Masonry settings
$('.grid').masonry({
  columnWidth: '.grid-sizer',
  gutter: '.gutter-sizer',
  itemSelector: '.grid-item',
  percentPosition: true
});


//Image search
$(function() {

//Random picture on page load
  var randomSet = ['sea', 'SPA', 'mountain', 'sport', 'music', 'travel', 'animals', 'cinema', 'cooking', 'beach'];
  function getRandomImages() {
    var randomNumber = Math.floor(Math.random()*randomSet.length);
    var randomItem = randomSet[randomNumber];
    var query = "https://pixabay.com/api/?key=3593835-08e61501cc3c4859963576f14&per_page=100&image_type=photo&orientation=horizontal&callback=?&q=" + encodeURIComponent(randomItem);
    getjson(query);
  };

  getRandomImages();

//Add event listeners
  $('#query').on('keydown', function (event) {  
    if (event.keyCode == 13) {
      event.preventDefault ? event.preventDefault() : (event.returnValue = false);
      search();
    }
  });

  $('#search').on('click', function(event) {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    search();
  });

//Picture search
  function search() {
    var userQuery = $('#query').val();
    $('#query').val('');
    var query = "https://pixabay.com/api/?key=3593835-08e61501cc3c4859963576f14&per_page=100&image_type=photo&orientation=horizontal&callback=?&q=" + encodeURIComponent(userQuery);
    (userQuery.length > 2) ? getjson(query) : getRandomImages();
  };

//Get JSON
  function getjson(query) {
    $.getJSON (query, function(responseData){
      reloadMasonry(responseData);
    });
  };

//Insert pictures and tags in layout
  function reloadMasonry(responseData) {
    var masonryItems = $('.grid-item');
    for (var i = 0; i < masonryItems.length; i++) {
      var random = Math.floor(Math.random()*responseData.hits.length);
      var imageTitles = $('.grid-item_title');
      $(masonryItems[i]).css("background-image","url(" + responseData.hits[random].webformatURL + ")");
      $(imageTitles[i]).text(responseData.hits[random].tags);
    }
  };
});