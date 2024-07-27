import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
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
            if (req.body.name.toString().length < 3) {
                res.status(500).json({ message: "Preencha os campos corretamente!", code: "O apelido deve ter no minimo 03 caracteres" });
            } else if (req.body.password.toString().length < 5) {
                res.status(500).json({ message: "Preencha os campos corretamente!", code: "A senha deve ter no minimo 05 caracteres" });
            } else {
                const mongoReq = await axios.post(`${BaseURL}CriarConta`, { apelido: req.body.name, email: req.body.email, senha: req.body.password })
                    .then((mongoRes) => {
                        res.status(mongoRes.status).json({ message: mongoRes.data.message, code: mongoRes.data.code });
                    })
                    .catch((mongoError) => {
                        res.status(mongoError.response.status).json({ message: mongoError.response.data.message, code: mongoError.response.data.code });
                    });
            }
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
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
        res.status(500).json({ message: e.message });
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
        res.status(500).json({ message: e.message });
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
        res.status(500).json({ message: e.message });
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
        res.status(500).json({ message: e.message });
    }
});


app.post("/Note", async (req, res) => {
    try {
        const mongoReq = await axios.post(`${BaseURL}Nota`, { nota: { titulo: req.body.title, nota: req.body.content } }, { headers: { 'Authorization': req.headers.authorization } })
            .then((mongoRes) => {
                res.status(mongoRes.status).json({ message: mongoRes.data.message, code: mongoRes.data.code });
            })
            .catch((mongoError) => {
                res.status(mongoError.response.status).json({ message: mongoError.response.data.message, code: mongoError.response.data.code });
            });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

app.put("/Note/:id", async (req, res) => {
    try {
        const mongoReq = await axios.put(`${BaseURL}Nota?id=${req.params.id}`, { notaNova: { titulo: req.body.title, nota: req.body.content } }, { headers: { 'Authorization': req.headers.authorization } })
            .then((mongoRes) => {
                res.status(mongoRes.status).json({ message: mongoRes.data.message, code: mongoRes.data.code });
            })
            .catch((mongoError) => {
                res.status(mongoError.response.status).json({ message: mongoError.response.data.message, code: mongoError.response.data.code });
            });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

app.delete("/Note/:id", async (req, res) => {
    try {
        const mongoReq = await axios.delete(`${BaseURL}Nota?id=${req.params.id}`, { headers: { 'Authorization': req.headers.authorization } })
            .then((mongoRes) => {
                res.status(mongoRes.status).json({ message: mongoRes.data.message, code: mongoRes.data.code });
            })
            .catch((mongoError) => {
                res.status(mongoError.response.status).json({ message: mongoError.response.data.message, code: mongoError.response.data.code });
            });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

app.get("/Note/:id", async (req, res) => {
    try {
        const mongoReq = await axios.get(`${BaseURL}Nota?id=${req.params.id}`, { headers: { 'Authorization': req.headers.authorization } })
            .then((mongoRes) => {
                res.status(mongoRes.status).json({ id: mongoRes.data.Nota._id, user: mongoRes.data.Nota.usuario, title: mongoRes.data.Nota.titulo, content: mongoRes.data.Nota.nota, date: mongoRes.data.Nota.data, visible: mongoRes.data.Nota.publica });
            })
            .catch((mongoError) => {
                res.status(mongoError.response.status).json({ message: mongoError.response.data.message, code: mongoError.response.data.code });
            });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

app.put("/PublishNote/:id", async (req, res) => {
    try {
        const mongoReq = await axios.put(`${BaseURL}AtualizarPrivacidadeNota?id=${req.params.id}`, { _id: req.params.id }, { headers: { 'Authorization': req.headers.authorization } })
            .then((mongoRes) => {
                res.status(mongoRes.status).json({ message: mongoRes.data.message, code: mongoRes.data.code });
            })
            .catch((mongoError) => {
                res.status(mongoError.response.status).json({ message: mongoError.response.data.message, code: mongoError.response.data.code });
            });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

app.get("/Notes", async (req, res) => {
    try {
        const mongoReq = await axios.get(`${BaseURL}Notas`, {
            headers: { 'Authorization': req.headers.authorization }
        })
        .then((mongoRes) => {
            const result = mongoRes.data.map(note => ({
                id: note._id,
                user: note.usuario,
                title: note.titulo,
                content: note.nota.replaceAll('\n', '<br />'),
                date: note.data,
                visible: note.publica
            }));
            res.status(mongoRes.status).json(result);
        })
        .catch((mongoError) => {
            res.status(mongoError.response.status).json({ message: mongoError.response.data.message, code: mongoError.response.data.code });
        });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

export default app;