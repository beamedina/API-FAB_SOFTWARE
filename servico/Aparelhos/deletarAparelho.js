import pool from "../conexao.js"

export async function DeletaAparelho(id) {
    const conexao = await pool.getConnection();

    const query = 'DELETE from APARELHO WHERE idAparelho = ?';
    const [resposta] = await conexao.execute(query, [id]);
    console.log(resposta);
    conexao.release();
    return resposta;
}