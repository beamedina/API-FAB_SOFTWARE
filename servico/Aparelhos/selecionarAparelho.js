import pool from "../conexao.js"
export async function selecionarAparelho(nome) {
    const conexao = await pool.getConnection();
    const query = 'SELECT * FROM APARELHO WHERE nome like ?';
    const [aparelhos] = await conexao.query(query, [`%${nome}%`]);
    conexao.release();
    return aparelhos;
}


export async function selectTodosAparelhos() {
    const conexao = await pool.getConnection();
    const query = 'SELECT * FROM APARELHO';
    const [funcionarios] = await conexao.query(query);
    conexao.release();
    return funcionarios;
}
