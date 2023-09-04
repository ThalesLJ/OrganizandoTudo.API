import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());
const BaseURL = "https://data.mongodb-api.com/app/application-0-mqvuy/endpoint/";

app.get("/", (req, res) => {
    try {
        res.status(200).json({ status: "OK" });
    } catch (e) {
        res.status(500).json({ status: "ERROR" });
    }
});

app.post("/CreateAccount", async (req, res) => {
    try {
        if (req.body.name == null || req.body.email == null || req.body.password == null) {
            res.status(500).json({ message: "Preencha todos os campos!", code: "Algum dos dados informados está vazio" });
        } else {
            const mongoReq = await axios.post(`${BaseURL}CriarConta`, { apelido: req.body.name, email: req.body.email, senha: req.body.password })
                .then((mongoRes) => {
                    res.status(mongoRes.status).json({ message: mongoRes.data.message, code: mongoRes.data.code });
                })
                .catch((mongoError) => {
                    res.status(mongoError.response.status).json({ message: mongoError.response.data.message, code: mongoError.response.data.code });
                });
        }
    } catch (e) {
        res.status(500).json({ Error: e.message });
    }
});

app.post("/Login", async (req, res) => {
    try {
        if (req.body.name == null || req.body.password == null) {
            res.status(500).json({ message: "Preencha todos os campos!", error_code: "Algum dos dados informados está vazio" });
        } else {
            const mongoReq = await axios.post(`${BaseURL}Login`, { apelido: req.body.name, senha: req.body.password })
                .then((mongoRes) => {
                    res.status(mongoRes.status).json({ token: mongoRes.data.Token, name: mongoRes.data.Apelido, email: mongoRes.data.Email });
                })
                .catch((mongoError) => {
                    res.status(mongoError.response.status).json({ message: mongoError.response.data.error });
                });
        }
    } catch (e) {
        res.status(500).json({ Error: e.message });
    }
});

app.post("/VerifyToken", async (req, res) => {
    try {
        const mongoReq = await axios.post(`${BaseURL}ValidarToken`, {}, { headers: { 'Authorization': req.headers.authorization } })
            .then((mongoRes) => {
                res.status(mongoRes.status).json({ message: mongoRes.data.message, code: mongoRes.data.code });
            })
            .catch((mongoError) => {
                res.status(mongoError.response.status).json({ message: mongoError.response.data.message, code: mongoError.response.data.code });
            });
    } catch (e) {
        res.status(500).json({ Error: e.message });
    }
});

app.get("/User", async (req, res) => {
    try {
        const mongoReq = await axios.get(`${BaseURL}Perfil`, { headers: { 'Authorization': req.headers.authorization } })
            .then((mongoRes) => {
                res.status(mongoRes.status).json({ name: mongoRes.data.apelido, email: mongoRes.data.email });
            })
            .catch((mongoError) => {
                res.status(mongoError.response.status).json({ message: mongoError.response.data.message, code: mongoError.response.data.code });
            });
    } catch (e) {
        res.status(500).json({ Error: e.message });
    }
});

app.put("/User", async (req, res) => {
    try {
        const mongoReq = await axios.put(`${BaseURL}Perfil`, { dados: { apelido: req.body.name, email: req.body.email, senha: req.body.password } }, { headers: { 'Authorization': req.headers.authorization } })
            .then((mongoRes) => {
                res.status(mongoRes.status).json({ message: mongoRes.data.message, code: mongoRes.data.code });
            })
            .catch((mongoError) => {
                res.status(mongoError.response.status).json({ message: mongoError.response.data.message, code: mongoError.response.data.code });
            });
    } catch (e) {
        res.status(500).json({ Error: e.message });
    }
});

export default app;
