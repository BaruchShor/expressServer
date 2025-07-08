import express from "express";

const PORT = 4547;

const server = express();
server.use(express.json());

server.get('/greet', (req, res) => {
    const time = new Date();
    const respons = {
        "msg" : `Hi from get endpoint ${time}`
    }
    res.send(respons);
});

//listener

server.listen(PORT, () => {
    console.log(`express server listening on port: ${PORT}`);
})