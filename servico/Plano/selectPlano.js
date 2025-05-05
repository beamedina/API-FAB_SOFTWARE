import pool from "../conexao.js"
export async function selectPlanos(nome) {
    const conexao = await pool.getConnection();
    const query = 'SELECT * FROM plano WHERE nome = ?';
    const [planos] = await conexao.query(query, [nome]);
    conexao.release();
    return planos;
}


export async function selectTodosPlanos() {
    const conexao = await pool.getConnection();
    const query = 'SELECT * FROM plano';
    const [planos] = await conexao.query(query);
    conexao.release();
    return planos;
}
