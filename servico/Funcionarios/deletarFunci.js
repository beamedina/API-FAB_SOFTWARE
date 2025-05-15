import pool from "../conexao.js"

export async function DeletaFunci(id) {
    const conexao = await pool.getConnection();

    const query = 'DELETE from FUNCIONARIO WHERE idFUNCIONARIO = ?';
    const [resposta] = await conexao.execute(query, [id]);
    console.log(resposta);
    conexao.release();
    return resposta;
}