import pool from "../conexao.js";

export async function atualizaFunci(id, cpf, telefone, nome, endereco, cargo, rg, cnh, email, senha) {
    const conexao = await pool.getConnection();

    try {
        const query = `
            UPDATE funcionario 
            SET cpf = ?, telefone = ?, nome = ?, endereco = ?, cargo = ?, rg = ?, cnh = ?, email = ?, senha = ?
            WHERE idFUNCIONARIO = ?
        `;
        const [resposta] = await conexao.execute(query, [cpf, telefone, nome, endereco, cargo, rg, cnh, email, senha, id]);

        console.log("Resposta do UPDATE:", resposta);
        return resposta;
    } catch (error) {
        console.error("Erro ao atualizar funcionário:", error.message);
        throw error; // repassa o erro para quem chamou a função
    } finally {
        conexao.release();
    }
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