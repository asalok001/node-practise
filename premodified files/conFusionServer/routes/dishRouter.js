const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();


// ******* CRUD operation below are chained in single line with Route.All method   *******

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req, res, next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get( (req, res, next) =>{
    res.end("This Will Send All The Dishes To You");
})
.post((req, res, next) =>{
    res.end('will add the dishes ' +req.body.name +'with details ' +req.body.description );
})
.put((req, res, next) =>{
    res.statusCode = 403;
    res.end('Put operation cannot be done on dishes ');
})
.delete((req, res, next) =>{
    res.end("deleting all the dishes");
});

dishRouter.route('/:dishId')
.all((req,res, next) =>{
    res.statusCode =200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) =>{
    res.end("This Will Send you the details of: "
    + req.params.dishId +' to you ');
})
.post((req, res, next) =>{
    res.statusCode = 403;
    res.end('Post operation cannot be done on dishes/ ' +req.params.dishId);
})
.put((req, res, next) =>{
    res.write('Updating the dish : ' +req.params.dishId +'\n');
    res.end("will update the dish :" +req.body.name 
    +"with details " +req.body.description);
})
.delete((req, res, next) =>{
    res.end("deleting dish :" +req.params.dishId );
});



module.exports = dishRouter;