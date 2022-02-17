const express = require('express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const testSchema = new Schema({
    name : {
        type: String,
    },
    lastname :{
        type: String
    }
});

var test1 = mongoose.model('Dummy1', testSchema);
module.exports = test1;