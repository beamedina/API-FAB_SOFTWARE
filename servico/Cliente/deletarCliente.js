import pool from "../conexao.js";

export async function DeletaCliente(id) {
    const conexao = await pool.getConnection();

    const query = 'DELETE from cliente WHERE id = ?';
    const [resposta] = await conexao.execute(query, [id]);
    console.log(resposta);
    conexao.release();
    return resposta;
}