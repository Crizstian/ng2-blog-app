'use strict';
const mongoose = require('mongoose');

const postSchema = {
  title: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now,
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
module.exports.postSchema = postSchema;
