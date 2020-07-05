// 创建数据库连接
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "db_sudoku",
    port: 3306
})

connection.connect((err) => {
    if (err) { console.log("连接失败") }
    else { console.log("连接成功") }
})

var query = (sql, params, callback) => {
    connection.query(sql, params, function (err, rows) {
        callback(err, rows);
    });
}

exports.query = query;
