import pool from "../conexao.js";

export async function cadastrarPlano( nome, descricao, preco) {
    const conexao = await pool.getConnection();
    
    const resposta = await conexao.query(
        'INSERT INTO PLANO (  nome, descricao, preco) VALUES (?, ?, ?)',
        [ nome, descricao, preco]
    );
    
    console.log(resposta);
    conexao.release();
}
