"use strict";

const http = require("http");
const { readFile, writeFile, appendFile } = require("fs");
const { LogPath, Port, Hostname } = require("../Data/Configure.json");

const server = http.createServer((req, res) => {
    switch (req.url) {
        case "/Log":
            if (req.method === "GET") {
                readFile(LogPath, "utf8", (err, data) => {
                    if (err) {
                        res.writeHead(500, {"Content-Type": "text/plain; charset=utf8"});
                        res.end(err);
                    }
                    else {
                        res.writeHead(200, {"Content-Type": "text/plain; charset=utf8"});
                        res.end(data);
                    }
                });
            }
            if (req.method === "POST") {
                let data = "";
                req.on("data", chunk => data += chunk);
                req.on("end", () => {
                    appendFile(LogPath, `[${new Date().toLocaleString()}]: ${data}`, (err) => {
                        if (err) {
                            res.writeHead(500, {"Content-Type": "text/plain; charset=utf8"});
                            res.end(err);
                        }
                        else {
                            res.writeHead(200, {"Content-Type": "text/plain; charset=utf8"});
                            res.end("success.");
                        }
                    });
                });
            }
            break;
    }
});

server.listen(Port, Hostname, () => {
    console.log("server is ready");
});