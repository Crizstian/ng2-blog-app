'use strict';
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    dropDups: true,
    required: true
  },
  description: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const Category = mongoose.model('Category',categorySchema,'categories');

module.exports = Category;

// Get Categories
module.exports.getCategories = function(callback){
	Category.find(callback).sort([['created', 'descending']]);
}

// Add Category
module.exports.addCategory = function(category, callback){
	Category.create(category, callback);
}

// Get Single Category
module.exports.getCategoryById = function(id, callback){
	Category.find(id, callback);
}

// Update Category
module.exports.updateCategory = function(query, update, options, callback){
	Category.findOneAndUpdate(query, update, options, callback);
}
