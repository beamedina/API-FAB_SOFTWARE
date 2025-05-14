import mysql from 'mysql2/promise';


const pool = mysql.createPool({
    host: 'ss04ggwskkwc0ksgcookg48w',
    port: '3306',
    user: 'IFtness',
    password: '12345678',
    database: 'iffitness_db'
    })

export default pool;

//teste