const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',     // e.g., 'root'
    password: 'testdrive1', // your MySQL password
    database: 'hdsdatabase'
  });

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});
  
