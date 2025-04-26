import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'bia4108@',
    database: 'ifitness'
});

export default pool;