import express from "express";

const app = express();

app.get("/", (request, response) =>{
    response.status(200).send("API running");
});

app.get("/Login", (request, response) =>{
    response.status(200).json({ msg: 'Bem Vindo' });
});

export default app;
