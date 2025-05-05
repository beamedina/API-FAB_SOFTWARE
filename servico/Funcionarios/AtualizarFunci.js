import pool from "../conexao.js";
export async function atualizaFunci(id, cpf, telefone, nome, endereco, cargo, rg, cnh, email) {
    const conexao = await pool.getConnection();
    const query = 'UPDATE funcionario SET cpf = ?, telefone = ?, nome = ?, endereco = ?, cargo = ?, rg = ?, cnh =?, email = ? WHERE idFuncionario = ?';
    const [resposta] = await conexao.execute(query, [ cpf, telefone, nome, endereco, cargo, rg, cnh, email, id]);
    console.log(resposta);
    conexao.release();
    return resposta;
}

export async function atualizaEFunci(id, campos){
    const conexao = await pool.getConnection();

    const colunas = Object.keys(campos).map(campo => `${campo} = ?`).join(", ");
    const valores = Object.values(campos);

    const query = `UPDATE funcionario SET ${colunas} WHERE idFuncionario = ?`;
    valores.push(id);
    const [resposta] = await conexao.execute(query, valores);
    console.log(resposta);
    conexao.release();
    return resposta;
}