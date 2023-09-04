import express from "express";

const app = express();

app.get("/", (req, res) =>{
    res.status(200).send("API running");
});

app.get("/Login", (req, res) =>{
    res.status(200).json({ msg: 'Bem Vindo' });
});

export default app;
