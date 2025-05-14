export async function cadastraFuncionario(cpf, telefone, nome, endereco, cargo, rg, cnh, email, senha) {
    const conexao = await pool.getConnection();

    try {
        const resposta = await conexao.query(
            'INSERT INTO FUNCIONARIO (cpf, telefone, nome, endereco, cargo, rg, cnh, email, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [cpf, telefone, nome, endereco, cargo, rg, cnh, email, senha]
        );

        console.log(resposta);
    } catch (erro) {
        console.error("Erro ao cadastrar funcionário:", erro);
    } finally {
        conexao.release();
    }
}
