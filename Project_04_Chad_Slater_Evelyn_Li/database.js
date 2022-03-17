const pgp = require('pg-promise')();

const username = 'postgres';
const password = '1234';
const host = 'localhost';
const port = '5432';
const database = 'incode_project_03_chad_slater';

const cn = `postgres://${username}:${password}@${host}:${port}/${database}`;

// Creat db instance
const db = pgp(cn);

module.exports = db;
