import express from "express";
import usersRuoter from "./router.js";

const PORT = 4547;

const server = express();
server.use(logger)
server.use(express.json());
server.use('/users', usersRuoter);

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
    let resoult  = {};
    const respons  = await fetch(`http://localhost:4547/GET/greet/${req.params.name}`).then(() => {return req.params.name});
    if(req.params.name === respons){
        resoult.isOK = true;
    }else{
        resoult.isOK = false;
    }
    res.send(resoult)
});

server.get('/GET/greet/:name', (req, res) => {
    const time = new Date();
    const respons = {
        "msg" : `Hi, got name ${req.params.name}`
    }
    res.send(respons);
});

server.post('/POST/action', (req, res) => {
    let obj = {};
    if(!req.body || (req.body.actionType != "joke" && req.body.actionType != "cat face")){
        obj.msg = "body is malformed";
        res.send(obj)
    }


})

//listener

server.listen(PORT, () => {
    console.log(`express server listening on port: ${PORT}`);
})