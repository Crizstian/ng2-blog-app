'use strict';
const mongoose = require('mongoose');

const managementSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    dropDups: true,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  num: {
    type: Number,
    default: 1
  },
  img: {
    type: String,
    default: '../app/img/back1.jpg'
  },
  user: {
    type: String,
    default: 'Cristian Ramirez'
  }
});

const Management = mongoose.model('Management',managementSchema,'managements');

module.exports = Management;

// Get Categories
module.exports.getManagements = function(callback){
	Management.find(callback).sort([['created', 'ascending']]);
}

// Add Management
module.exports.addManagement = function(management, callback){
	Management.create(management, callback);
}

// Get Single Management
module.exports.getManagementById = function(id, callback){
	Management.find(id, callback);
}

// Update Management
module.exports.updateManagement = function(query, update, options, callback){
	Management.findOneAndUpdate(query, update, options, callback);
}
