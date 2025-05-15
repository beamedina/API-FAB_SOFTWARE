import pool from "../conexao.js";

export async function atualizaCliente(id, nome, endereco, telefone, cpf, plano) {
    try{
        const conexao = await pool.getConnection();
        const query = 'UPDATE CLIENTE SET nome = ?, endereco = ?, telefone = ?, cpf = ?, plano = ? WHERE idCliente = ?';
        const [resposta] = await conexao.execute(query, [nome, endereco, telefone, cpf, plano, id]);
        console.log(resposta);
        conexao.release();
        return resposta;
    }catch (error) {
        console.error("Erro na função atualiza todos clientes:", error);  
        throw error;
    }
    
}

export async function atualizaEspecifico(id, campos){
    const conexao = await pool.getConnection();

    const colunas = Object.keys(campos).map(campo => `${campo} = ?`).join(", ");
    const valores = Object.values(campos);

    const query = `UPDATE CLIENTE SET ${colunas} WHERE idCliente = ?`;
    valores.push(id);
    const [resposta] = await conexao.execute(query, valores);
    console.log(resposta);
    conexao.release();
    return resposta;
}