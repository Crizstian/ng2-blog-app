var mongoose = require('mongoose');
var _        = require('underscore');

module.exports = function(wagner) {
  mongoose.connect('mongodb://localhost:27017/blogApp');

  wagner.factory('db', function() {
    return mongoose;
  });

  var post = mongoose.model('post', require('../models/postSchema'), 'posts');
  var category = mongoose.model('category', require('../models/categorySchema'), 'categories');

  var models = {
    Post: post,
    Category: category
  };

  // To ensure DRY-ness, register factories in a loop
  _.each(models, function(value, key) {
    wagner.factory(key, function() {
      return value;
    });
  });

  return models;
};
