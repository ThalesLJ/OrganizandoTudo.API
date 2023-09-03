const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

router.get("/", (req, res) =>{
    res.status(200).send("API running");
});

router.get("/Login", (req, res) =>{
    res.status(200).json({ msg: 'Bem Vindo' });
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
