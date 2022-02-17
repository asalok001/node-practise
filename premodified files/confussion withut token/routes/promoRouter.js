const express = require('express');
const bodyParser  = require('body-parser');

const mongoose = require('mongoose');
const Promotions = require('../models/promotions');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get((req , res, next) =>{
    Promotions.find({})
    .then((promotions) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(promotions);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req , res, next) =>{
    Promotions.create(req.body)
    .then((promotions) =>{
        console.log('Promotion Created ', promotions);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req,res, next) =>{
    res.statusCode= 403;
    res.end("Put operation can not supported /promotions");
})
.delete((req, res, next) =>{
    Promotions.remove({})
    .then((response) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }, (err) => next(err))
    .catch((err) => next(err));
});

 promoRouter.route('/:promoId')
 .get((req, res, next) =>{
     Promotions.findById(req.params.promoId)
     .then((promotion) =>{
         res.statusCode= 200;
         res.setHeader('Content-Type', 'application/json');
         res.json(promotion);
     }, (err) => next(err))
     .catch((err) => next(err));
 })
 .post((req, res, next) =>{
     res.statusCode= 403;
     res.end('Post can not be Supported on /:promoId');
 })
 .put((req,res, next) =>{
     Promotions.findByIdAndUpdate(req.params.promoId, {
         $set : req.body
     }, {new : true})
     .then((promotions) =>{
         res.statusCode= 200;
         res.setHeader('Content-Type', 'application/json');
         res.json(promotions);
     }, (err)=> next(err))
     .catch((err) => next(err));
 })
.delete((req, res, next) =>{
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((response) =>{
        res.statusCode= 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }, (err) => next(err))
    .catch((err) => next(err));
})
module.exports = promoRouter;