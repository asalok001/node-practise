const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Dishes = require('../models/dishes');
var authenticate = require('../authenticate');

const dishRouter = express.Router();



dishRouter.use(bodyParser.json());

dishRouter.route('/')
.get((req, res, next) =>{
    Dishes.find({})
    .then((dishes) =>{
        res.statusCode  = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyuser, (req, res, next) =>{
    Dishes.create(req.body)
    .then((dish) =>{
        console.log('Dish Created', dish);
        res.statusCode  = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyuser, (req, res, next) =>{
    res.statusCode = 403;
    res.end('Put operation cannot be done on dishes ');
})
.delete(authenticate.verifyuser, (req, res, next) =>{
    Dishes.remove({})
    .then((response) =>{
        res.statusCode  = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }, (err) => next(err))
    .catch((err) => next(err));
});

dishRouter.route('/:dishId')

.get((req, res, next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyuser, (req, res, next) =>{
    res.statusCode = 403;
    res.end('Post operation cannot be done on dishes/ ' +req.params.dishId);
})
.put(authenticate.verifyuser, (req, res, next) =>{
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, {new: true})
    .then((dish) =>{
        res.statusCode= 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyuser, (req, res, next) =>{
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((response) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }, (err) => next(err))
    .catch((err) => next(err));
});


dishRouter.route('/:dishId/comments')
.get((req, res, next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish) =>{
        if(dish != null){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments);
        }
        else{
            err = new Error('Dish' + req.params.dishId + 'not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyuser, (req, res, next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish) =>{
        if(dish != null){
            dish.comments.push(req.body);
            dish.save()
            .then((dish) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err));
        }
        else{
            err = new Error('Dish ' +req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyuser, (req, res, next) =>{
    res.statusCode = 203;
    res.end('Put operation can not be performed on /dishes/ '
    +req.params.dishId +' /comments');
})
.delete(authenticate.verifyuser, (req, res, next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish) =>{
        if(dish !=null){
            for(var i= (dish.comments.length -1); i>=0; i--){
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save()
            .then((dish) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err));
        }
        else{
            err = new Error('Dish ' +req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

dishRouter.route('/:dishId/comments/:commentId')
.get((req, res, next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish) =>{
        if(dish !=null && dish.comments.id(req.params.commentId) != null){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments.id(req.params.commentId));
        }
        else if(dish == null){
            err = new Error('Dish ' +req.params.dishId +' not found');
            err.status = 404;
            return next(err);
        }
        else{
            err = new Error('Comment ' +req.params.commentId +' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyuser, (req, res, next) =>{
    res.statusCode = 403;
    res.end('Post operation is not supported on /dishes ' +req.params.dishId 
    + ' /comments/' +req.params.commentId);
})
.put(authenticate.verifyuser, (req, res, next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish) =>{
        if(dish !=null && dish.comments.id(req.params.commentId) != null){
            if(req.body.rating){
                dish.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if(req.body.comment){
                dish.comments.id(req.params.commentId).comment = req.body.comment;
            }
            dish.save()
            .then((dish)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err));
        }
        else if(dish == null){
            err = new Error('Dish ' +req.params.dishId +' not found');
            err.status = 404;
            return next(err);
        }
        else{
            err = new Error('Comment ' +req.params.commentId +' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyuser, (req, res, next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish) =>{
        if(dish !=null && dish.comments.id(req.params.commentId) != null){
            dish.comments.id(req.params.commentId).remove();   
            dish.save()
            .then((dish) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err));
        }
        else if(dish == null){
            err = new Error('Dish ' +req.params.dishId +' not found');
            err.status = 404;
            return next(err);
        }
        else{
            err = new Error('Comment ' +req.params.commentId +' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})


module.exports = dishRouter;