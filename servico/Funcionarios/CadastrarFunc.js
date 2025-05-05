import pool from "../conexao.js";

export async function cadastraFuncionario( cpf, telefone, nome, endereco, cargo, rg, cnh, email) {
    const conexao = await pool.getConnection();
    
    const resposta = await conexao.query(
        'INSERT INTO FUNCIONARIO ( cpf, telefone, nome, endereco, cargo, rg, cnh, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [ cpf, telefone, nome, endereco, cargo, rg, cnh, email]
    );
    
    console.log(resposta);
    conexao.release();
}
