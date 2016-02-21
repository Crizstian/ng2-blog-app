'use strict';
const mongoose = require('mongoose');

const categorySchema = {
  title: {
    type: String,
    unique: true,
    dropDups: true,
    required: true
  },
  description: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
};

module.exports = new mongoose.Schema(categorySchema);
module.exports.categorySchema = categorySchema;

// module.exports.getCategories = function(callback,limit){
//   cs.find(callback).limit(limit);
// }
//
// module.exports.addCategory = function(category,callback){
//   console.log(category);
//   cs.create(category,callback);
// }
