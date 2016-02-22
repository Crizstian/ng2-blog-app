'use strict';
const express    = require('express');
const status     = require('http-status');

module.exports = function(wagner){

  const api     = express.Router();

  /* GET All posts */
  api.get('/', wagner.invoke((Post) => {
    return (req,res) => {
      Post.getPosts(function(err, posts) {
    		if(err){
    			res.send(err);
    		} else {
    			res.json(posts);
    		}
    	});
    }
  }));

  api.get('/post/:id', wagner.invoke((Post) => {
    return (req,res) => {
  		let query  = {_id: [req.params.id]};
      Post.getPostById(query,function(err, post) {
    		if(err){
    			res.send(err);
    		} else {
          console.log("fetching one post");
    			res.json(post);
    		}
    	});
    }
  }));

  api.post('/add', wagner.invoke((Post,db) => {
    return (req,res) => {
      let p = JSON.parse(req.body);
      let post = new Post({
        title: p.title,
        content: p.content,
        img: p.img
      });

  		Post.addPost(post, function(err, post){
  			if(err){
  				res.send(err);
  			} else {
          console.log("adding a post");
  				return res.json(post);
  			}
  		});
    }
  }));


  api.put('/post/:id', wagner.invoke((Post) => {
    return (req,res) => {
      let p   = JSON.parse(req.body);
  		let query  = {_id: [req.params.id]};
  		let update = {title: p.title, content: p.content, img:p.img};

  		Post.updatePost(query, update, {}, function(err, post){
  			if(err){
  				res.send(err);
  			} else {
          console.log("updating one post");
  				return res.json(post);
  			}
  		});
    }
  }));

  api.delete('/post/:id', wagner.invoke((Post) => {
    return (req,res) => {
      var query = {_id: [req.params.id]};
    	Post.remove(query, function(err){
    		if(err){
    				res.send(err);
    			} else {
            console.log("deleting a post");
    				res.json({post:'deleted'});
    			}
    	});
    }
  }));

  return api;
}
