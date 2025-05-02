const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ninja_rgs",
});

connection.query("SHOW TABLES;", (err, results) => {
  if (err) {
    console.error("❌ ERROR:", err.message);
  } else {
    console.log("✅ TABLES:", results);
  }
  connection.end();
});
