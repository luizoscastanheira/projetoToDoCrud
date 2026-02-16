/**
 * API Rest do projeto ToDo
 */

// Importações e configurações iniciais
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json()); // habilita o req.body para o formato json
app.use(cors()); // habilita o cors para aceitar conexões de domínios diferentes

// Endpoints
app.get("/info", (req, res)=>{
    res.json({"mensagem":"O sistema está online!"});
});

// Configuração de portas
app.listen(8080, ()=>{
    let dataAtual = new Date();
    console.log(`O Servidor iniciou às ${dataAtual}`)

});