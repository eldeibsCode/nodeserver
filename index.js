// const Person = require("./person");
// console.log("Hello From Node.js...");
// const person1 = new Person('john Doe', 30);
// person1.greeting();
// console.log(path.extname(__filename))


// const Logger = require('./logger');
// const logger = new Logger();
// logger.on('mess', (data) => console.log('Called Listener', data))
// logger.log('hello world') 

const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res)=> {
    // console.log(req.url);
    // if(req.url === '/'){
    //     fs.readFile(path.join(__dirname, 'public','index.html' ), (err, content)=>{
    //         if (err) throw err;
    //         res.writeHead(200, {'Content-Type': 'text/html'});
    //         res.end(content);
    //         }
    //     );
    // } 

    // if(req.url === '/about'){
    //     fs.readFile(path.join(__dirname, 'public','about.html' ), (err, content)=>{
    //         if (err) throw err;
    //         res.writeHead(200, {'Content-Type': 'text/html'});
    //         res.end(content);
    //         }
    //     );
    // }

    // if(req.url === '/api/users'){
    //     const users = [
    //         {name : 'Bob', age: 30},
    //         {name: 'John Doe', age: 20}
    //     ];
    //     res.writeHead(200, {'Content-Type': 'application/json'});
    //     res.end(JSON.stringify(users))

    // }


    // Build file path
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html': req.url);
    console.log(filePath);
    console.log(req.url);
    // Extension of file:
    let extname = path.extname(filePath);

    // Initial content type
    let contentType = 'text/html';

    // check ext and set content type
    
    switch(extname){
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jng':
            contentType = 'image/jng';
            break;
    }

    // Read file 
    fs.readFile(filePath, (err, content) =>{
        if (err){
            if (err.code == 'ENOENT'){
                // page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    console.log('from ENONET');
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(content, 'utf8');
                })
            }else{
                // some server error
                console.log('outside ENONET');
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        }else{
            // Success
            console.log('Success');
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf8');
        }
        
    });
    

});
const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
