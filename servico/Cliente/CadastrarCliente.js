import pool from "../conexao.js";

export  async function cadastraCliente(nome, endereco, telefone, cpf) {
    const conexao = await pool.getConnection();
    
    const resposta = await conexao.query(
        'INSERT INTO cliente (nome, endereco, telefone, cpf) VALUES (?, ?, ?, ?)',
        [nome, endereco, telefone, cpf]
    );
    
    console.log(resposta);
    conexao.release();
}
