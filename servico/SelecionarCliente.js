import pool from "./conexao.js";

export async function selectCliente(nome) {
    const conexao = await pool.getConnection();
    const query = 'SELECT * FROM cliente WHERE nome=' + nome;
    const clientes = executaQuery(conexao, query);
    conexao.release();
    return clientes;
}