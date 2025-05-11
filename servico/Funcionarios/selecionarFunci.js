import pool from "../conexao.js"

export async function selectFunci(nome) {
    const conexao = await pool.getConnection();
    const query = 'SELECT * FROM funcionario WHERE nome LIKE ?';
    const [funcionarios] = await conexao.query(query, [`%${nome}%`]);
    conexao.release();
    return funcionarios;
}


export async function selectTodosFuncionarios() {
    const conexao = await pool.getConnection();
    const query = 'SELECT * FROM funcionario';
    const [funcionarios] = await conexao.query(query);
    conexao.release();
    return funcionarios;
}
