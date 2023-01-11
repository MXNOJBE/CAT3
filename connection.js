const mysql = require("mysql2")
const con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "admin",
    port: 3306,
    database: "infosys"
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connection is created");
});

module.exports.con = con;