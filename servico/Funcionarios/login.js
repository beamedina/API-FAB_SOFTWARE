import pool from "../conexao.js";
export async function verificarLogin(email, senha) {
    const conexao = await pool.getConnection();
    const [results] = await conexao.query(
      'SELECT * FROM funcionario WHERE email = ? AND senha = ?',
      [email, senha]
    );
  
    conexao.release(); 
  
    return results; 
  }
  