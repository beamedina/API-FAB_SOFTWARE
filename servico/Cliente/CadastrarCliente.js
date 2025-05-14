import pool from "../conexao.js";

export  async function cadastraCliente(nome, endereco, telefone, cpf,plano) {
    const conexao = await pool.getConnection();
    
    const resposta = await conexao.query(
        'INSERT INTO CLIENTE (nome, endereco, telefone, cpf, plano) VALUES (?, ?, ?, ?, ?)',
        [nome, endereco, telefone, cpf, plano]
    );
    
    console.log(resposta);
    conexao.release();
}
