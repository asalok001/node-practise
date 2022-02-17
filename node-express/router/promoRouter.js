const express = require('express');
const bodyParser  = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req , res, next) =>{
    res.end("This will send all the promotions to you");
})
.post((req , res, next) =>{
    res.end('Will add the promotion ' 
    +req.body.name +' with details ' +req.body.details);
})
.put((req,res, next) =>{
    res.statusCode = 403;
    res.end('Put operation cannot be done on Promotions');
})
.delete((req, res, next) =>{
    res.end("deleting all promotions");
});

 promoRouter.route('/:promoId')
 .all((req, res, next) =>{
     res.statusCode = 200;
     res.setHeader('Content-Type', '/text/plain');
     next();
 })
 .get((req, res, next) =>{
     res.end('Will send you promotion of ' +req.params.promoId);
 })
 .post((req, res, next) =>{
     res.statusCode = 403;
     res.end('Post Operation cannot be done on ' +req.params.promoId);
 })
 .put((req,res, next) =>{
     res.write('Updating the promotion of ' + req.params.promoId + '\n');
     res.end("Will update the promotion  with " +req.body.name
     +' with details' + req.body.details);
 })
.delete((req, res, next) =>{
    res.end('Deleting the promotion ' +req.params.promoId);
})
module.exports = promoRouter;