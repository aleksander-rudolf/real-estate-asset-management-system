const mysql = require("mysql2");

const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "password",
	database: "real_estate_portfolio",
});

module.exports = db;