/**
 * API Rest do projeto ToDo
 */

// Importações e configurações iniciais
import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); // passando o caminho para o arquivo .env

import express from "express";
import cors from "cors";

const port = process.env.NODE_PORT;

// Teste do .env - se der undefined é por porque o .env NÃO foi carregado
console.log("Host:", process.env.DATABASE_HOST);
console.log("Port:", process.env.DATABASE_PORT);
console.log(port)

import { CreateTodo, UpdateTodosStatus, ReadTodos, ReadTodosId, DeleteTodo } from "./database/crud.js";

// Instanciando no express atribuindo-o à contante app
const app = express(); 

// Configuranções iniciais para o app
app.use(express.json()); // habilita o req.body para o formato json
app.use(cors()); // habilita o cors para aceitar conexões de domínios diferentes


// Endpoints
// Pegando informaçòes do sistema
app.get("/info", (req, res)=>{
    res.json({"mensagem":"O sistema está online!"});
});

// READ - Listando todos os registros do banco
app.get("/todos", async (req, res) => {
    const Todos = await ReadTodos();
    res.json(Todos);
});

// READ - Listando um unico registro pelo id
app.get("/todos/:id", async (req, res) => {
    const Todo = await ReadTodosId(req.params.id);
    res.json(Todo[0])
});

// CREATE - Cadastrando uma to-do
app.post("/todos", async (req, res) => {
    const resposta = await CreateTodo(req.body.title, false);
    res.json(resposta)
});

// Configuração de portas
app.listen(port, ()=>{
    let dataAtual = new Date();
    console.log(`O Servidor iniciou às ${dataAtual}`)

});