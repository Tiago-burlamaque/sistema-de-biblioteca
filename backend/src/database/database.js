import mysql2 from 'mysql2/promise'

const db = mysql2.createPool({
    user: "root",
    password: "futlast",
    host: "localhost",
    database: "sistema_biblioteca"
})

export default db;