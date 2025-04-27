import pool from '../conexao.js';


export async function selectCliente(nome) {
    const conexao = await pool.getConnection();
    const query = 'SELECT * FROM cliente WHERE nome = ?';
    const [clientes] = await conexao.query(query, [nome]);
    conexao.release();
    return clientes;
}
