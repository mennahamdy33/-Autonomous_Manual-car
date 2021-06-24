// var express = require('express');
// var app = express();
// app.use(express.static('public'));
// const requestListener = function (req, res) {
//     res.setHeader("Content-Type", "application/json");
//     res.writeHead(200);
//     res.end(`{"message": "This is a JSON response"}`);
// };

// data = app.get("/", function (req, res) {
//     res.send("Hey, I am responding to your request!");
//    });

// app.listen(65432, (res,req)=> {

//   console.log(data);
// });

// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

const express = require('express');
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});

const app = express();
const PORT = 65432;
const data ;
app.use(express.static('public'));

app.post('/upload', upload.single('photo'), (req, res) => {
    if(req.file) {
        data = res.json(req.file);
    }
    else throw 'error';
});

app.listen(PORT, () => {
    console.log('Listening at ' + PORT );
});