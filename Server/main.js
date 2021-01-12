"use strict";

const http = require("http");

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url.startsWith("/log/")) {
        // get log
        console.log(req.url + "GET");
    }
    else if (req.method === "POST" && req.url.startsWith("/log/")) {
        // update log
        console.log(req.url + "POST");
    }
    else {
        console.log(req.url);
    }
});

server.listen(8956, "localhost", () => {
    console.log("server is ready");
});