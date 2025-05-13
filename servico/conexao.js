import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'ss04ggwskkwc0ksgcookg48w',
    user: 'iffitness',
    password: '12345678',
    database: 'iffitness_db',
    port: 3306
});

export default pool;

//teste