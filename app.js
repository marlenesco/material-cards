require('font-awesome-webpack!./less/font-awesome.config.js');
require('./less/material-cards-auto-height.less');

var $ = require('jquery');
var jQueryBridget = require('jquery-bridget');
require('./js/jquery.material-cards.js');
var Masonry = require('masonry-layout');
jQueryBridget('masonry', Masonry, $);

$(function () {

  var $grid = $('.grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: 390
  });

  $('.material-card').materialCard().on('shown.material-card hidden.material-card', function (event) {
    $grid.masonry();
  });

});
