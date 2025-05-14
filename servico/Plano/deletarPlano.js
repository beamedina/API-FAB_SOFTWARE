import pool from "../conexao.js"

export async function deletarPlano(id) {
    const conexao = await pool.getConnection();

    const query = 'DELETE from PLANO WHERE idPlano = ?';
    const [resposta] = await conexao.execute(query, [id]);
    console.log(resposta);
    conexao.release();
    return resposta;
}