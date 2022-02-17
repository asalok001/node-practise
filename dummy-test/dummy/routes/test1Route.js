const express = require('express');
const bodyParser = require('body-parser');
const Schema1 = require('../models/test1');
const mongoose = require('mongoose');
const router1 = express.Router();

router1.route('/')
.get((req, res, next) =>{

    Schema1.find()
    .then((dish) =>{
        res.statusCode= 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) =>{
    Schema1.create(req.body)
    .then((dish) =>{
        console.log('Dish Created', dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = router1;
