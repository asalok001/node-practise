const express = require('express'); 
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req, res, next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req , res, next) =>{
    res.end("This will send all the leaders to you");
})
.post((req , res, next) =>{
    res.end('Will add the leader ' 
    +req.body.name +' with details ' +req.body.details);
})
.put((req,res, next) =>{
    res.statusCode = 403;
    res.end('Put operation cannot be done on Leaders');
})
.delete((req, res, next) =>{
    res.end("deleting all leaders");
});

 leaderRouter.route('/:leaderId')
 .all((req, res, next) =>{
     res.statusCode = 200;
     res.setHeader('Content-Type', '/text/plain');
     next();
 })
 .get((req, res, next) =>{
     res.end('Will send you leader of ' +req.params.leaderId);
 })
 .post((req, res, next) =>{
     res.statusCode = 403;
     res.end('Post Operation cannot be done on ' +req.params.leaderId);
 })
 .put((req,res, next) =>{
     res.write('Updating the leader of ' + req.params.leaderId + '\n');
     res.end("Will update the leader  with " +req.body.name
     +' with details' + req.body.details);
 })
.delete((req, res, next) =>{
    res.end('Deleting the leader ' +req.params.leaderId);
})
module.exports = leaderRouter;