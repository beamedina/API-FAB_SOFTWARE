import pool from "../conexao.js";
export async function atualizarAparelho(id, nome, local, quantidade) {
    const conexao = await pool.getConnection();
    const query = 'UPDATE APARELHO SET nome = ?, local = ?, quantidade = ? WHERE idAparelho = ?';
    const [resposta] = await conexao.execute(query, [nome, local, quantidade, id]);
    console.log(resposta);
    conexao.release();
    return resposta;
}


export async function atualizaEAparelho(id, campos){
    const conexao = await pool.getConnection();

    const colunas = Object.keys(campos).map(campo => `${campo} = ?`).join(", ");
    const valores = Object.values(campos);

    const query = `UPDATE APARELHO SET ${colunas} WHERE idAparelho = ?`;
    valores.push(id);
    const [resposta] = await conexao.execute(query, valores);
    console.log(resposta);
    conexao.release();
    return resposta;
}