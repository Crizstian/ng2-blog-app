'use strict';
const express = require('express');

module.exports = function(wagner){

  const api = express.Router();

  /* GET All Posts */
  api.get('/posts', wagner.invoke((Post) => {
    return (req,res) => {
      console.log("fetching all posts");
      Post.find({}, function(err, posts) {
        if (err) {
          return handleError(err,res);
        }
        return res.json(posts);
      });
    };
  }));

  api.get('/post/:id', wagner.invoke((Post) => {
    return (req,res) => {
      console.log("fetching one post");
      let id = req.params.id.replace(/\-/g,' ');
      console.log(id);
      Post.find({title: id},function(err,post){
        if (err) {
          return handleError(err,res);
        }

        return res.json(post);
      });
    };
  }));

  api.post('/post', wagner.invoke((Post,db) => {
    return (req,res) => {
      console.log("Posting one post");
      let t = JSON.parse(req.body);
      let post = new Post({
        _id:db.Types.ObjectId(),
        text: t.text,
        isCompleted: t.isCompleted
      });

      post.save(function(err,post){
        if (err) {
          return handleError(err,res);
        }
        return res.json(post);
      });
    };
  }));


  api.put('/post/:id', wagner.invoke((Post) => {
    return (req,res) => {
      console.log("updating one post");
      let t = JSON.parse(req.body);
      Post.findById(req.params.id,function(err,post){
        if (err) {
          return handleError(err,res);
        }
        post.isCompleted = t.isCompleted;
        post.text = t.text;
        post.save(function(err,post){
          if (err) {
            return handleError(err,res);
          }
          return res.json(post);
        });
      });
    };
  }));

  api.delete('/post/:id', wagner.invoke((Post) => {
    return (req,res) => {
      console.log("deleting a post");
      Post.findByIdAndRemove(req.params.id,function(err,post){
          if (err) {
            return handleError(err,res);
          }
          return res.json({post:'deleted'});
      });
    };
  }));

  return api;
}
