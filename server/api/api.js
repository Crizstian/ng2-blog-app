'use strict';
const bodyparser = require('body-parser');
const express    = require('express');
const status     = require('http-status');
const _          = require('underscore');
const cors       = require('cors');

module.exports = function(wagner) {
  var api = express.Router();

  api.use(bodyparser.json());
  api.use(bodyparser.text({
   type: 'text/plain'
  }));
  api.use(cors());

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
      let Post = new Post({
        _id:db.Types.ObjectId(),
        text: t.text,
        isCompleted: t.isCompleted
      });

      Post.save(function(err,post){
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

  api.use(handleOne);
  return api;
};

function handleError(err,res){
  return res.status(status.INTERNAL_SERVER_ERROR)
            .json({ err: err.toString() });
}

function handleOne(err, req, res, next) {
  if (err) {
    return res.
      status(status.INTERNAL_SERVER_ERROR).
      json({ err: err.toString() });
  }
  else {
    return res.
      status(status.NOT_FOUND).
      json({ err: 'Not found' });
  }
}
