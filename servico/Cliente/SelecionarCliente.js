import pool from '../conexao.js';


export async function selectCliente(nome) {
    const conexao = await pool.getConnection();
    const query = 'SELECT * FROM CLIENTE WHERE nome like ?';
    const [clientes] = await conexao.query(query, [`%${nome}%`]);
    conexao.release();
    return clientes;
}


export async function selectTodosClientes() {
    try {
        const conexao = await pool.getConnection();
        const query = 'SELECT * FROM iffitness_db.CLIENTE';
        const [clientes] = await conexao.query(query);
        conexao.release();
        return clientes;
    } catch (error) {
        console.error("Erro na função select todos clientes:", error);  
        throw error;
    }
}