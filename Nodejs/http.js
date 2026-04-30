const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url);
    console.log(req.method);
    // res.end("Hello......");

    if(req.url === "/") {
        res.end("Home Page");
    } else if(req.url === "/about") {
        res.end("About page");
    } else {
        res.end("404 Page not found");
    }
})


server.listen(3000, ()=> {
    console.log("Server listening on http://localhost:3000");
})