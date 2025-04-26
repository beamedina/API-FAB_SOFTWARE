const express = require('express');
import { cadastraCliente } from './servico/CadastrarCliente';

const db = require('./db');
require('dotenv').config();

const app = express();

app.use(express.json());

class Cliente{
constructor(codcliente, nomecliente, datanascimento, cpf){
this.codcliente = codcliente;
this.nomecliente=nomecliente;
this.datanascimento=datanascimento;
this.cpf=cpf
}
}
const port = 3000;


app.post("/clientes", async (request, reponse)=>{
const cliente = new Cliente;
cliente.nomecliente = request.body.nomecliente;
cliente.datanascimento = request.body.datanascimento;
cliente.cpf=request.body.cpf;
await db.insertCliente(cliente);
reponse.sendStatus(201);
}
)
app.get('/clientes', async (req, res) =>{
const resultado = await db.selectCliente();
res.json(resultado);
});

app.get('/clientes/:id', async (req, res) =>{
const resultado = await db.selectClienteId(req.params.id);
res.json(resultado);
});

app.delete('/clientes/:id', (req, res) =>{
db.selectClienteId(req.params.id);
res.send('Excluir Clientes');
});

app.listen(process.env.PORT, ()=>{
console.log('escutando.....');
});

1
const mysql = require('mysql2/promise');
const { cadastraCliente } = require('./servico/CadastrarCliente');
require('dotenv').config();

const conexao = mysql.createPool(process.env.CONNECTION_STRING);

async function selectCliente(){
const resultados = await conexao.query('SELECT * FROM cliente;');
return(resultados[0]);
}

async function selectClienteId(id){
const resultados = await conexao.query('SELECT * FROM cliente where codcliente=?;',[id]);
return(resultados[0]);
}

async function insertCliente(cliente){
const values = [cliente.nomecliente, cliente.datanascimento, cliente.cpf];
await conexao.query("insert into cliente(nomecliente, datanascimento, cpf) values(?,?,?);",
values);
}
async function exluirClienteId(id){
const resultados = await conexao.query('SELECT * FROM cliente where codcliente=?;',[id]);
return(resultados[0]);
}

module.exports = {
selectCliente,
selectClienteId,
insertCliente
}