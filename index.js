import express from 'express';
import { cadastraCliente } from './servico/Cliente/CadastrarCliente.js'; // <-- Importação nomeada
import { selectCliente } from './servico/Cliente/SelecionarCliente.js';
import { DeletaCliente } from './servico/Cliente/deletarCliente.js';
import { atualizaEspecifico } from './servico/Cliente/atualizaCliente.js';
import { atualizaCliente } from './servico/Cliente/atualizaCliente.js';
import { cadastraFuncionario } from './servico/Funcionarios/CadastrarFunc.js';
import { DeletaFunci } from './servico/Funcionarios/deletarFunci.js';
import { atualizaFunci } from './servico/Funcionarios/AtualizarFunci.js';
import { atualizaEFunci } from './servico/Funcionarios/AtualizarFunci.js';
import { selectFunci, selectTodosFuncionarios } from './servico/Funcionarios/selecionarFunci.js';
import { cadastrarAparelho } from './servico/Aparelhos/cadastrarAparelho.js';
import { DeletaAparelho } from './servico/Aparelhos/deletarAparelho.js';
import { atualizaEAparelho, atualizarAparelho } from './servico/Aparelhos/atualizarAparelho.js';
import { selecionarAparelho, selectTodosAparelhos } from './servico/Aparelhos/selecionarAparelho.js';
import { verificarLogin } from './servico/Funcionarios/login.js';
import { cadastrarPlano } from './servico/Plano/CadastrarPlano.js';
import { deletarPlano } from './servico/Plano/deletarPlano.js';
import { atualizaEPlano, atualizarPlano } from './servico/Plano/atualizarPlano.js';
import { selectPlanos, selectTodosPlanos } from './servico/Plano/selectPlano.js';




const app = express();

app.use(express.json()); // Suporte para json no corpo (body) da requisição

app.post('/clientes', async (req, res) => {
    try{
        const { nome, endereco, telefone, cpf, plano } = req.body;
    
        await cadastraCliente(nome, endereco, telefone, cpf, plano); // Chama a função importada
        res.status(204).end();
    }catch (error){
        res.status(500).send(error)
    }
});

app.post('/funcionarios', async (req, res) => {
    console.log(req.body);
    const { cpf, telefone, nome, endereco, cargo, rg, cnh, email, senha} = req.body;

    await cadastraFuncionario( cpf, telefone, nome, endereco, cargo, rg, cnh, email, senha); 
    res.status(204).end();
});

app.post('/aparelhos', async (req, res) => {
    const { nome, local, quantidade} = req.body;

    await cadastrarAparelho( nome, local, quantidade); 
    res.status(204).end();
});


app.post('/planos', async (req, res) => {
    const {  nome, descricao, preco} = req.body;

    await cadastrarPlano( nome, descricao, preco); 
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

app.get('/funcionarios/:nome', async (req, res) => {
    const nome = req.params.nome;
    const funcionario = await selectFunci(nome);
    if (funcionario.length > 0) {
        res.json(funcionario);
    } else {
        res.status(404).json({ mensagem: "Nenhum funcionario encontrado" });
    }
});


app.get('/funcionarios', async (req, res) => {
    try {
        const funcionarios = await selectTodosFuncionarios();
        res.json(funcionarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao buscar funcionários", error : error });
    }
});


app.get('/aparelhos/:nome', async (req, res) => {
    const nome = req.params.nome;
    const aparelhos = await selecionarAparelho(nome);
    if (aparelhos.length > 0) {
        res.json(aparelhos);
    } else {
        res.status(404).json({ mensagem: "Nenhum aparelho encontrado" });
    }
});


app.get('/aparelhos', async (req, res) => {
    try {
        const funcionarios = await selectTodosAparelhos();
        res.json(funcionarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao buscar aparelhos" });
    }
});

app.get('/planos/:nome', async (req, res) => {
    const nome = req.params.nome;
    const planos = await selectPlanos(nome);
    if (planos.length > 0) {
        res.json(planos);
    } else {
        res.status(404).json({ mensagem: "Nenhum plano encontrado" });
    }
});


app.get('/planos', async (req, res) => {
    try {
        const planos = await selectTodosPlanos();
        res.json(planos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao buscar planos" });
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


app.delete('/aparelhos/:id', async (req, res) => {
    const {id} = req.params;

    if (isNaN(id)) {
        res.status(404).send('Parâmetro inválido!');
    } 
    else {
        const resultado = await DeletaAparelho(id);

        if (resultado.affectedRows > 0) {
            res.status(202).send('Registro deletado com sucesso!');
        } else {
            res.status(404).send('Registro não encontrado!');
        }
    }
})


app.delete('/planos/:id', async (req, res) => {
    const {id} = req.params;

    if (isNaN(id)) {
        res.status(404).send('Parâmetro inválido!');
    } 
    else {
        const resultado = await deletarPlano(id);

        if (resultado.affectedRows > 0) {
            res.status(202).send('Registro deletado com sucesso!');
        } else {
            res.status(404).send('Registro não encontrado!');
        }
    }
})


app.put('/clientes/:id', async (req, res) => {
    const { id } = req.params; 
    const { nome, endereco, telefone, cpf, plano } = req.body;

    if (nome == undefined || endereco == undefined || telefone == undefined, plano == undefined) {
        res.status(400).send('Todos os campos devem ser informados!')
    } else {
        const resultado = await atualizaCliente(id, nome, endereco, telefone, cpf, plano);
        if (resultado.affectedRows > 0) {
            res.status(202).send('Registro atualizado com sucesso!')
        } else {
            res.status(404).send('Registro não encontrado!');
        }
    }
});

app.put('/funcionarios/:id', async (req, res) => {
    const { id } = req.params; 
    const { cpf, telefone, nome, endereco, cargo, rg, cnh, email } = req.body;

    if (cpf == undefined || telefone == undefined || nome == undefined || endereco == undefined || cargo == undefined || rg == undefined || cnh == undefined || email == undefined) {
        res.status(400).send('Todos os campos devem ser informados!')
    } else {
        const resultado = await atualizaFunci(id,cpf, telefone, nome, endereco, cargo, rg, cnh, email);
        if (resultado.affectedRows > 0) {
            res.status(202).send('Registro atualizado com sucesso!')
        } else {
            res.status(404).send('Registro não encontrado!');
        }
    }
});


app.put('/aparelhos/:id', async (req, res) => {
    const { id } = req.params; 
    const { nome, local, quantidade} = req.body;

    if (nome == undefined || local == undefined || quantidade == undefined) {
        res.status(400).send('Todos os campos devem ser informados!')
    } else {
        const resultado = await atualizarAparelho(id,nome, local, quantidade);
        if (resultado.affectedRows > 0) {
            res.status(202).send('Registro atualizado com sucesso!')
        } else {
            res.status(404).send('Registro não encontrado!');
        }
    }
});



app.put('/planos/:id', async (req, res) => {
    const { id } = req.params; 
    const { nome, descricao, preco} = req.body;

    if (nome == undefined || descricao == undefined || preco == undefined) {
        res.status(400).send('Todos os campos devem ser informados!')
    } else {
        const resultado = await atualizarPlano(id,nome, descricao, preco);
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


app.patch('/funcionarios/:id', async (req, res) => {
    const { id } = req.params;
    const { cpf, telefone, nome, endereco, cargo, rg, cnh, email } = req.body;

const camposAtualizar = {};
if (nome) camposAtualizar.nome = nome;
if (endereco) camposAtualizar.endereco = endereco;
if (telefone) camposAtualizar.telefone = telefone;
if (cpf) camposAtualizar.cpf = cpf;
if (cargo) camposAtualizar.cargo = cargo;
if (rg) camposAtualizar.rg = rg;
if (cnh) camposAtualizar.cnh = cnh;
if (email) camposAtualizar.email = email;

if (Object.keys(camposAtualizar).length === 0) {
    res.status(400).send('Nenhum campo válido foi enviado para atualização');
} else {
    const resultado = await atualizaEFunci(id, camposAtualizar);

    if (resultado.affectedRows > 0) {
        res.status(202).send('Registro atualizado com sucesso!');
    } else {
        res.status(404).send('Registro não encontrado!');
    }
}
});


app.patch('/aparelhos/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, local, quantidade} = req.body;

    const camposAtualizar = {};
    if (nome) camposAtualizar.nome = nome;
    if (local) camposAtualizar.local = local;
    if (quantidade) camposAtualizar.quantidade = quantidade;

    if (Object.keys(camposAtualizar).length === 0) {
        res.status(400).send('Nenhum campo válido foi enviado para atualização');
    } else {
        const resultado = await atualizaEAparelho(id, camposAtualizar);


        if (resultado.affectedRows > 0) {
            res.status(202).send('Registro atualizado com sucesso!');
        } else {
            res.status(404).send('Registro não encontrado!');
        }
    }
});


app.patch('/planos/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco} = req.body;

    const camposAtualizar = {};
    if (nome) camposAtualizar.nome = nome;
    if (descricao) camposAtualizar.descricao = descricao;
    if (preco) camposAtualizar.preco = preco;

    if (Object.keys(camposAtualizar).length === 0) {
        res.status(400).send('Nenhum campo válido foi enviado para atualização');
    } else {
        const resultado = await atualizaEPlano(id, camposAtualizar);


        if (resultado.affectedRows > 0) {
            res.status(202).send('Registro atualizado com sucesso!');
        } else {
            res.status(404).send('Registro não encontrado!');
        }
    }
});


app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
  
    try {
      
      const results = await verificarLogin(email, senha);
  
      if (results.length === 0) {
        res.status(401).json({ erro: 'Email ou senha incorretos' });
      } else {
        res.status(200).json({ mensagem: 'Login bem-sucedido' });
      }
    } catch (err) {
      res.status(500).json({ erro: 'Erro no servidor' });
    }
  });

app.get('/teste/', async (req, res) =>{

    res.status(200).send("Ele conecta")
})

app.listen(9000, () => {
    const data = new Date();
    console.log("Servidor node iniciado em: " + data);
});
