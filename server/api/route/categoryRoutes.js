'use strict';
const express    = require('express');
const status     = require('http-status');

module.exports = function(wagner){

  const api     = express.Router();

  api.get('/test',(req,res)=> {
    return res.json({test: 'hello world'});
  });

  /* GET All categorys */
  api.get('/', wagner.invoke((Category) => {
    return (req,res) => {
      console.log("fetching all categories");
      Category.find({},(err, categories) => {
        if (err) {
          return res.send(err);
        }
        return res.json(categories);
      });
    };
  }));

  api.get('/category/:id', wagner.invoke((Category) => {
    return (req,res) => {

      console.log("fetching one category");
      let id = req.params.id.replace(/\-/g,' ');

      Category.find({title: id},function(err,category){
        if (err) {
          return res.send(err);
        }

        return res.json(category);
      });
    };
  }));

  api.post('/add', wagner.invoke((Category,db) => {
    return (req,res) => {

      let c = JSON.parse(req.body);
      let category = new Category({
        // _id:db.Types.ObjectId(),
        title: c.title,
        description: c.description
      });

      console.log("adding a category");

      Category.create(category,(err,category) => {
        if (err) {
          return res.send(err);
        }
        return res.json(category);
      });
    };
  }));


  api.put('/category/:id', wagner.invoke((Category) => {
    return (req,res) => {

      console.log("updating one category");
      let c = JSON.parse(req.body);
      let id = req.params.id.replace(/\-/g,' ');

      Category.findById({title:id},function(err,category){
        if (err) {
          return res.send(err);
        }
        category.title = c.title;
        category.description = c.description;

        category.save(function(err,category){
          if (err) {
            return res.send(err);
          }
          return res.json(category);
        });
      });
    };
  }));

  api.delete('/category/:id', wagner.invoke((Category) => {
    return (req,res) => {
      console.log("deleting a category");

      let id = req.params.id.replace(/\-/g,' ');

      Category.find({title:id}).remove((err,category) => {
          if (err) {
            return res.send(err);
          }
          return res.json({category:'deleted'});
      });
    };
  }));



  return api;
}
