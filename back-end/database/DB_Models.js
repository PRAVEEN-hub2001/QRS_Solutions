const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASENAME,
});

db.connect((err) => {
  if (err) console.log("Error In DB Connection");
  else console.log("DB Connected");
});

db.query(
  "CREATE TABLE students (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(100) NOT NULL,email VARCHAR(100) UNIQUE NOT NULL,password VARCHAR(20) NOT NULL,role BOOLEAN DEFAULT FALSE,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
  function (err, result) {
    if (err && err.errno !== 1050) throw err;
    console.log("students table created");
  }
);
db.query(
  "CREATE TABLE courses (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255) NOT NULL,description TEXT,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
  function (err, result) {
    if (err && err.errno !== 1050) throw err;
    console.log("courses table created");
  }
);

db.query(
  "CREATE TABLE training_schedules (id INT AUTO_INCREMENT PRIMARY KEY,course_id INT,starting_date TIMESTAMP NOT NULL,ending_date TIMESTAMP NOT NULL,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE)",
  function (err, result) {
    if (err && err.errno !== 1050) throw err;
    console.log("training_schedules table created");
  }
);

module.exports = { db };
