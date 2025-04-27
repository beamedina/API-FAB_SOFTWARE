import express from 'express';
import { cadastraCliente } from './servico/Cliente/CadastrarCliente.js'; // <-- Importação nomeada
import { selectCliente } from './servico/Cliente/SelecionarCliente.js';
import { DeletaCliente } from './servico/Cliente/deletarCliente.js';
import { atualizaEspecifico } from './servico/Cliente/atualizaCliente.js';
import { atualizaCliente } from './servico/Cliente/atualizaCliente.js';
import { cadastraFuncionario } from './servico/CadastrarFunc.js';
import { DeletaFunci } from './servico/deletarFunci.js';

const app = express();

app.use(express.json()); // Suporte para json no corpo (body) da requisição

app.post('/clientes', async (req, res) => {
    const { nome, endereco, telefone, cpf } = req.body;

    await cadastraCliente(nome, endereco, telefone, cpf); // Chama a função importada
    res.status(204).end();
});

app.post('/funcionarios', async (req, res) => {
    const { cpf, telefone, nome, endereco, cargo, rg, cnh, email } = req.body;

    await cadastraFuncionario( cpf, telefone, nome, endereco, cargo, rg, cnh, email); 
    res.status(204).end();
});


app.get('/clientes/:nome', async (req, res) => {
    const nome = req.params.nome;
    const clientes = await selectCliente(nome);
    if (clientes.length > 0) {
        res.json(clientes);
    } else {
        res.status(404).json({ mensagem: "Nenhum cliente encontrado" });
    }
});


app.delete('/clientes/:id', async (req, res) => {
    const {id} = req.params;

    if (isNaN(id)) {
        res.status(404).send('Parâmetro inválido!');
    } 
    else {
        const resultado = await DeletaCliente(id);

        if (resultado.affectedRows > 0) {
            res.status(202).send('Registro deletado com sucesso!');
        } else {
            res.status(404).send('Registro não encontrado!');
        }
    }
})



app.delete('/funcionarios/:id', async (req, res) => {
    const {id} = req.params;

    if (isNaN(id)) {
        res.status(404).send('Parâmetro inválido!');
    } 
    else {
        const resultado = await DeletaFunci(id);

        if (resultado.affectedRows > 0) {
            res.status(202).send('Registro deletado com sucesso!');
        } else {
            res.status(404).send('Registro não encontrado!');
        }
    }
})


app.put('/clientes/:id', async (req, res) => {
    const { id } = req.params; 
    const { nome, endereco, telefone, cpf } = req.body;

    if (nome == undefined || endereco == undefined || telefone == undefined) {
        res.status(400).send('Todos os campos devem ser informados!')
    } else {
        const resultado = await atualizaCliente(id, nome, endereco, telefone, cpf);
        if (resultado.affectedRows > 0) {
            res.status(202).send('Registro atualizado com sucesso!')
        } else {
            res.status(404).send('Registro não encontrado!');
        }
    }
});


app.patch('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, endereco, telefone, cpf } = req.body;

    const camposAtualizar = {};
    if (nome) camposAtualizar.nome = nome;
    if (endereco) camposAtualizar.endereco = endereco;
    if (telefone) camposAtualizar.telefone = telefone;
    if (cpf) camposAtualizar.cpf = cpf;

    if (Object.keys(camposAtualizar).length === 0) {
        res.status(400).send('Nenhum campo válido foi enviado para atualização');
    } else {
        const resultado = await atualizaEspecifico(id, camposAtualizar);


        if (resultado.affectedRows > 0) {
            res.status(202).send('Registro atualizado com sucesso!');
        } else {
            res.status(404).send('Registro não encontrado!');
        }
    }
});


app.listen(9000, () => {
    const data = new Date();
    console.log("Servidor node iniciado em: " + data);
});
