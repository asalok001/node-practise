const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dishRouter = require('./router/dishRouter');
const promoRouter = require('./router/promoRouter')
const leaderRouter = require('./router/leadersRouter')

const hostname = 'localhost';
const port = 6060;

const app = express();
app.use(morgan('dev'));

// **** Any request incoming with /dishes will handled by dishRouter file
app.use('/dishes', dishRouter);
app.use('/promotion', promoRouter);
app.use('/leader', leaderRouter);


app.use(express.static(__dirname+ '/public'));
app.use(bodyParser.json());

//  ****  Used in dishRouter file ********** 

// app.all('/dishes', (req, res, next) =>{
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();
// });

// app.get('/dishes', (req, res, next) =>{
//     res.end("This Will Send All The Dishes To You");
// });

// app.post('/dishes', (req, res, next) =>{
//     res.end('will add the dishes ' +req.body.name +'with details ' +req.body.description );
// });

// app.put('/dishes', (req, res, next) =>{
//     res.statusCode = 403;
//     res.end('Put operation cannot be done on dishes ');
// });

// app.delete('/dishes', (req, res, next) =>{
//     res.end("deleting all the dishes");
// });

// app.get('/dishes/:dishId', (req, res, next) =>{
//     res.end("This Will Send you the details of: "
//     + req.params.dishId +' to you ');
// });

// app.post('/dishes/:dishId', (req, res, next) =>{
//     res.statusCode = 403;
//     res.end('Post operation cannot be done on dishes/ ' +req.params.dishId);
// });

// app.put('/dishes/:dishId', (req, res, next) =>{
//     res.write('Updating the dish : ' +req.params.dishId +'\n');
//     res.end("will update the dish :" +req.body.name 
//     +"with details " +req.body.description);
// });

// app.delete('/dishes/:dishId', (req, res, next) =>{
//     res.end("deleting dish :" +req.params.dishId );
// });

app.use((req, res, next) =>{
    console.log(req.headers);
    res.statusCode= 200;
    res.setHeader('Content-Type', 'text/html');
    res.end("<html><body><h1> This is an express Example </h1></body></html>")
});

const server= http.createServer(app);

server.listen(port, hostname, () =>{
    console.log(`Server Running at http://${hostname}:${port} `);
})