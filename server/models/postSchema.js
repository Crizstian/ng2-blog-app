'use strict';
const mongoose = require('mongoose');

const postSchema = {
  title: {
    type: String,
    required: true
  },
  created: {
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

const Post = mongoose.model('Post',postSchema,'posts');

module.exports = Post;

// Get Categories
module.exports.getPosts = function(callback){
	Post.find(callback).sort([['title', 'descending']]);
}

// Add Post
module.exports.addPost = function(post, callback){
	Post.create(post, callback);
}

// Get Single Post
module.exports.getPostById = function(id, callback){
	Post.find(id, callback);
}

// Update Post
module.exports.updatePost = function(query, update, options, callback){
	Post.findOneAndUpdate(query, update, options, callback);
}
