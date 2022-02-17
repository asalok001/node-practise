const http = require('http');
const fs = require('fs');
const path =require('path');

const hostname= 'localhost';
const port = 6060;
const server = http.createServer((req, res) =>{
    console.log("Reqest for " +req.url +'by method' +req.method);


    if(req.method== 'GET'){

        var fileUrl;
        if(req.url == '/') fileUrl= '/index.html';
        else fileUrl = req.url;

        var filePath=path.resolve('./public'+fileUrl);
        const fileExt= path.extname(fileUrl);
        if(fileExt == '.html'){
            fs.exists(filePath, (exists) =>{            //  callback function parameter exists is boolean which return true or false
                if(!exists){
                    res.statusCode= 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body><h1> ERROR 404!  ' +fileUrl+ 'page can not found </h1></body></html>');
                    return;
                }
                res.statusCode= 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(res);
                //  createReadStream method read in file and send the file out by converting file  
                // into bytes and pipe to response (res)
            })
        }
        else{
            res.statusCode= 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1> ERROR 404!  ' +fileUrl+ 'page can not found an html page </h1></body></html>');
            return;
        }
    }
    else{

        res.statusCode= 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1> ERROR 404!  ' +req.method+ 'not supported </h1></body></html>');
        return;
    }

    // res.statusCode= 200;
    // res.setHeader('Content-Type', 'text/html');
    // res.end('<html><body><h1> Hello World<h1><body><html>')
})

server.listen(port, hostname, ()=>{
    console.log(`Server  is running on http://${hostname} on port ${port}`);
});