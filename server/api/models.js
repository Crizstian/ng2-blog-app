'use strict';

const mongoose = require('mongoose');
const _        = require('underscore');

module.exports = function(wagner) {
  mongoose.connect('mongodb://localhost:27017/blogApp');

  wagner.factory('db', function() {
    return mongoose;
  });

  const post = require('../models/postSchema');
  const category = require('../models/categorySchema');
  const management = require('../models/managementSchema');

  const models = {
    Post: post,
    Category: category,
    Management: management
  };

  // To ensure DRY-ness, register factories in a loop
  _.each(models, function(value, key) {
    wagner.factory(key, function() {
      return value;
    });
  });

  return models;
};
