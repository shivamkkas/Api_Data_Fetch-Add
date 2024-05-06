var mysql = require('mysql2');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "express",
    port: 3306,
});

db.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log("Connected to MySQL DataBase..");
})

module.exports = db;  