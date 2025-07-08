import express from "express";

const PORT = 4547;

const server = express();
server.use(logger)
server.use(express.json());

function logger(req, res, next){
    console.log(`got req to: ${req.method}, url: ${req.url}`);
    res.isOK = true;
    next();
}

server.get('/greet', (req, res) => {
    const time = new Date();
    const respons = {
        "msg" : `Hi from get endpoint ${time}`
    }
    res.send(JSON.stringify(respons));
});

server.get('/GET/test/:name',async (req, res) => {
    console.log(req.params.name);
    const respons  = await fetch(`http://localhost:4547/GET/greet/${req.params.name}`).then(() => {return req.params.name});
    if(req.params.name === respons){
        res.isOK = true;
    }else{
        res.isOK = false;
    }
    res.send(res.isOK)
});

server.get('/GET/greet/:name', (req, res) => {
    const time = new Date();
    const respons = {
        "msg" : `Hi, got name ${req.params.name}`
    }
    res.send(respons);
});

//listener

server.listen(PORT, () => {
    console.log(`express server listening on port: ${PORT}`);
})