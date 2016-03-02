'use strict';
const bodyparser = require('body-parser');
const express    = require('express');
const status     = require('http-status');
const cors       = require('cors');

module.exports = function(wagner) {
  const api = express.Router();

  api.use(bodyparser.json());
  api.use(bodyparser.text({
   type: 'text/plain'
  }));
  api.use(cors());

  api.use('/posts',require('./route/postRoutes')(wagner));
  api.use('/categories',require('./route/categoryRoutes')(wagner));
  api.use('/management',require('./route/managementRoutes')(wagner));

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
