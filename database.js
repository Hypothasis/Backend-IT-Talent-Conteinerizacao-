import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_IP,
    port: process.env.MYSQL_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}).promise();

export async function getAlunos(){
    const result = await pool.query(`SELECT * FROM ALUNOS;`);
    return result[0];
}

export async function getAluno(id){
    const result = await pool.query(`
    SELECT * 
    FROM ALUNOS
    WHERE id = ?;
    `, [id]);
    return result[0];
}

export async function createAluno(nome, idade, cidade){
    const result = await pool.query(`
    INSERT INTO ALUNOS (nome, idade, cidade)
    VALUES (?, ?, ?);
    `, [nome, idade, cidade]);
    const id = result[0].insertId;
    return getAluno(id);
}