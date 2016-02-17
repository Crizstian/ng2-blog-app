'use strict';
const mongoose = require('mongoose');

const postSchema = {
  _id: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  img: {
    type: String
  }
};

module.exports = new mongoose.Schema(postSchema);
module.exports.todoSchema = postSchema;
