import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());
const BaseURL = "https://data.mongodb-api.com/app/application-0-mqvuy/endpoint/";

app.get("/", (req, res) => {
    res.status(200).send("API running");
});

app.post("/Login", async (req, res) => {
    try {
        const mongoReq = await axios.post(`${BaseURL}Login`, { apelido: req.body.apelido, senha: req.body.senha })
            .then((mongoRes) => {
                res.status(200).json({ Token: mongoRes.data.Token, Apelido: mongoRes.data.Apelido, Email: mongoRes.data.Email });
            })
            .catch((mongoError) => {
                console.log(mongoError.response.data);
                res.status(mongoError.response.status).json({ Erro: mongoError.response.data.error });
            });
    }
    catch (e) {
        res.status(500).json({ Erro: `Ocorreu uma falha no processamento da API: ${e.message}` });
    }
});

export default app;
