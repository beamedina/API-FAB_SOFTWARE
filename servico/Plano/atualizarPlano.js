import pool from "../conexao.js";
export async function atualizarPlano( id, nome, descricao, preco) {
    const conexao = await pool.getConnection();
    const query = 'UPDATE plano SET nome = ?, descricao = ?, preco = ? WHERE idPlano = ?';
    const [resposta] = await conexao.execute(query, [ nome, descricao, preco, id]);
    console.log(resposta);
    conexao.release();
    return resposta;
}

export async function atualizaEPlano(id, campos){
    const conexao = await pool.getConnection();

    const colunas = Object.keys(campos).map(campo => `${campo} = ?`).join(", ");
    const valores = Object.values(campos);

    const query = `UPDATE plano SET ${colunas} WHERE idPlano = ?`;
    valores.push(id);
    const [resposta] = await conexao.execute(query, valores);
    console.log(resposta);
    conexao.release();
    return resposta;
}