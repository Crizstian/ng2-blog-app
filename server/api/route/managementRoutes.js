'use strict';
const express    = require('express');
const status     = require('http-status');

module.exports = function(wagner){

  const api     = express.Router();

  /* GET All managements */
  api.get('/', wagner.invoke((Management) => {
    return (req,res) => {
      Management.getManagements(function(err, categories) {
    		if(err){
    			res.send(err);
    		} else {
    			res.json(categories);
    		}
    	});
    }
  }));

  api.get('/management/:id', wagner.invoke((Management) => {
    return (req,res) => {
  		let query  = {_id: [req.params.id]};
      Management.getManagementById(query,function(err, management) {
    		if(err){
    			res.send(err);
    		} else {
          console.log("fetching one management");
    			res.json(management);
    		}
    	});
    }
  }));

  api.post('/add', wagner.invoke((Management,db) => {
    return (req,res) => {
      let c = JSON.parse(req.body);
      let management = new Management({
        title: c.title,
        link: c.link
      });
      console.log(management);
  		Management.addManagement(management, function(err, management){
  			if(err){
  				res.send(err);
  			} else {
          console.log("adding a management");
  				return res.json(management);
  			}
  		});
    }
  }));


  api.put('/management/:id', wagner.invoke((Management) => {
    return (req,res) => {
      let c      = JSON.parse(req.body);
  		let query  = {_id: [req.params.id]};
  		let update = {title: c.title, link: c.link};
      console.log(query);
  		Management.updateManagement(query, update, {}, function(err, management){
  			if(err){
  				res.send(err);
  			} else {
          console.log("updating one management");
  				return res.json(management);
  			}
  		});
    }
  }));

  api.delete('/management/:id', wagner.invoke((Management) => {
    return (req,res) => {
      var query = {_id: [req.params.id]};
    	Management.remove(query, function(err){
    		if(err){
    				res.send(err);
    			} else {
            console.log("deleting a management");
    				res.json({management:'deleted'});
    			}
    	});
    }
  }));



  return api;
}
