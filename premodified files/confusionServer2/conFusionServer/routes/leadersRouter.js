const express = require('express'); 
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

const mongoose = require('mongoose');
const Leaders = require('../models/leaders');

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get((req , res, next) =>{
    Leaders.find({})
    .then((leaders) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req , res, next) =>{
    Leaders.create(req.body)
    .then((leaders) =>{
        console.log('Leaders Created', leaders);
        res.statusCode= 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
    }, (err) => next(err));
})
.put((req,res, next) =>{
    res.statusCode = 403;
    res.end('Put operation cannot be done on Leaders');
})
.delete((req, res, next) =>{
    Leaders.remove({})
    .then((response) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }, (err) => next(err))
    .catch((err) => next(err));
});

 leaderRouter.route('/:leaderId')
 .get((req, res, next) =>{
     Leaders.findById(req.params.leaderId)
     .then((leader) =>{
         res.statusCode= 200;
         res.setHeader('Content-Type', 'application/json');
         res.json(leader);
     }, (err) => next(err))
     .catch((err) => next(err));
 
 })
 .post((req, res, next) =>{
     res.statusCode = 403;
     res.end('Post Operation cannot be done on ' +req.params.leaderId);
 })
 .put((req,res, next) =>{
     Leaders.findByIdAndUpdate(req.params.leaderId, {
         $set: req.body
     }, {new : true})
     .then((leader) =>{
         res.statusCode = 200;
         res.setHeader('Content-Type', 'application/json');
         res.json(leader);
     }, (err) => next(err))
     .catch((err) => next(err));
 })
.delete((req, res, next) =>{
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((response) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'applicaion/json');
        res.json(response);
    }, (err) => next(err))
    .catch((err) => next(err));
})
module.exports = leaderRouter;