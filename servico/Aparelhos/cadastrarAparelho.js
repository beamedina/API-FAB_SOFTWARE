import pool from "../conexao.js"

export async function cadastrarAparelho( nome, local, quantidade) {
    const conexao = await pool.getConnection();
    
    const resposta = await conexao.query(
        'INSERT INTO APARELHO ( nome, local, quantidade) VALUES (?,?,?)',
        [ nome, local, quantidade]
    );
    
    console.log(resposta);
    conexao.release();
}
