'use strict';
const express    = require('express');
const status     = require('http-status');

module.exports = function(wagner){

  const api     = express.Router();

  /* GET All categorys */
  api.get('/', wagner.invoke((Category) => {
    return (req,res) => {
      Category.getCategories(function(err, categories) {
    		if(err){
    			res.send(err);
    		} else {
    			res.json(categories);
    		}
    	});
    }
  }));

  api.get('/category/:id', wagner.invoke((Category) => {
    return (req,res) => {
  		let query  = {_id: [req.params.id]};
      Category.getCategoryById(query,function(err, category) {
    		if(err){
    			res.send(err);
    		} else {
          console.log("fetching one category");
    			res.json(category);
    		}
    	});
    }
  }));

  api.post('/add', wagner.invoke((Category,db) => {
    return (req,res) => {
      let c = JSON.parse(req.body);
      let category = new Category({
        title: c.title,
        description: c.description
      });

  		Category.addCategory(category, function(err, category){
  			if(err){
  				res.send(err);
  			} else {
          console.log("adding a category");
  				return res.json(category);
  			}
  		});
    }
  }));


  api.put('/category/:id', wagner.invoke((Category) => {
    return (req,res) => {
      let c      = JSON.parse(req.body);
  		let query  = {_id: [req.params.id]};
  		let update = {title: c.title, description: c.description};
      console.log(query);
  		Category.updateCategory(query, update, {}, function(err, category){
  			if(err){
  				res.send(err);
  			} else {
          console.log("updating one category");
  				return res.json(category);
  			}
  		});
    }
  }));

  api.delete('/category/:id', wagner.invoke((Category) => {
    return (req,res) => {
      var query = {_id: [req.params.id]};
    	Category.remove(query, function(err){
    		if(err){
    				res.send(err);
    			} else {
            console.log("deleting a category");
    				res.json({category:'deleted'});
    			}
    	});
    }
  }));



  return api;
}
