import express from "express";
import fs from "node:fs/promises";

const ruoter = express.Router();

ruoter.get('/',async (req, res) => res.send(await fs.readFile("data.txt", "utf-8")));

ruoter.post('/', async (req, res) => {
try{
    const fileData = await fs.readFile("data.txt", "utf-8");
    const data = JSON.parse(fileData);
    if(!data) res.status(500).send("Server error");
    data.push(req.body);
    await fs.writeFile("data.txt", JSON.stringify(data));
    res.status(200).send("Seccess");
}catch(err){
    res.status(err.status || 500).send(err.message || "Server internal error!");
}
});

export default ruoter;