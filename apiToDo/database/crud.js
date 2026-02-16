/**
 * Arquivo responsável pelas operações com o SGBDR
 * 
 * Atenção: verifique se é necessário encerrar a coenxão em cada uma das funções do crud com uso de 
 * await sql.end(); // encerra a conexão com fazemos no caso do mysql
 * 
 */

// Imports e configuração inicial
import dotenv from 'dotenv'; // Configranção de uso do .env
dotenv.config({ path: "../.env" }); 

import postgres from "postgres";

// Teste do .env - se der undefined é por porque o .env NÃO foi carregado
console.log("Host:", process.env.DATABASE_HOST);
console.log("Port:", process.env.DATABASE_PORT);


// Conexão com o Banco de Dados
const sql = postgres({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      port: Number(process.env.DATABASE_PORT),
});

console.log(sql)

// const sql = postgres({
//     host: "localhost",
//     user: "postgres",
//     password: "123456",
//     database: "todo_db",
//     port: 5432,
// });

// Teste de conexão ao banco de dados, pode deixar comentado ou apagar
//async function testConnection() {
//   try {
//     const result = await sql`SELECT 1 as ok`;
//     console.log("Conexão bem-sucedida:", result);
//   } catch (error) {
//     console.error("Erro na conexão:", error);
      // evite usar o bloco finally pois ele fecha o pool todo caso vc mantenha função de teste rodando junco com as crud
//   } finally {
//     await sql.end(); // encerra a conexão
//   }
// }

// await  testConnection();


// Funções para operações com o SGBD

// Inserir um registro
export async function CreateTodo(title, completed){
  try{
    await sql `INSERT INTO todos (title, completed) VALUES (${title}, ${completed});`;
    return 'To-do criada com sucesso';
  } catch {
    return 'Erro ao criar To-do!';
  }
};

// Listar Todos os registros do banco
export async function ReadTodos(){
  return sql  `SELECT id, title, completed FROM todos;`;
  
};

// Listar um registro identificado por um id especificado
export async function ReadTodosId(id){
  return sql `SELECT id, title, completed FROM todos WHERE id = ${id};`;
};
  
// Atualizando o status de uma to-do através de seu id
//export async function UpdateTodosStatus(id, completed){
//  try{
//    await sql `UPDATE todos set completed = ${ completed } WHERE id = ${ id };`;
//    return 'To-do concluida.';
//  } catch {
//    return 'Erro ao concluir a to-do - não atualizada.';
//  };
//};

// Teste de função, APAGAR ao concluir o código
//CreateTodo('Rosicléia', true)

console.log(await ReadTodos());
console.log(await ReadTodosId(2));

// encerrando tudo
await sql.end(); // encerra a conexão