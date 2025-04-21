const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path'); 
const port = 3000;

app.use(cors());

app.use(express.static(__dirname));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',     
    password: 'Testdrive1!', 
    database: 'hdsdatabase'
  });

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});
  
//Sales Record
app.get('/api/sales/:salesRecord', (req, res) => {
  
  const salesRecord = req.params.salesRecord;

  const sql = 'SELECT * FROM orderdetails where OrderDetailsID = ?';

  db.query(sql, [salesRecord], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Order not found' });

    console.log(results[0]);

    res.json(results[0]);
  });
});

//Order Records
app.get('/api/orders/:orderRecord', (req, res) => {
  
  const orderRecord = req.params.orderRecord;

  const sql = 'SELECT * FROM orders where OrderNumber = ?';

  db.query(sql, [orderRecord], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Job not found' });

    console.log(results[0]);

    res.json(results[0]);
  });
});

//Customer Records
app.get('/api/customers/:customerIDRecord', (req, res) => {
  
  const customerIDRecord = req.params.customerIDRecord;

  const sql = 'SELECT * FROM customer WHERE CustomerID = ?';

  db.query(sql, [customerIDRecord], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Customer not found' });

    console.log(results[0]);

    res.json(results[0]);
  });
});

//Employee Records
app.get('/api/employees/:employeeIDRecord', (req, res) => {
  
  const employeeIDRecord = req.params.employeeIDRecord;

  const sql = 'SELECT * FROM employee WHERE EmployeeID = ?';

  db.query(sql, [employeeIDRecord], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Employee not found' });

    console.log(results[0]);

    res.json(results[0]);
  });
});

//Customer Order Records
app.get('/api/reciept/:customerOrderRecord', (req, res) => {
  
  const customerOrderRecord = req.params.customerOrderRecord;

  const sql = 'SELECT OrderNumber, Price, QuantityOrdered FROM orderdetails WHERE OrderDetailsID = ?';

  db.query(sql, [customerOrderRecord], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Order not found' });

    console.log(results[0]);

    res.json(results[0]);
  });
});

//Current Inventory
app.get('/api/products', (req, res) => {

  const sql = 'SELECT ProductID, ProductName, Description, Cost, QuantityOnHand FROM product';

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Product not found' });

    console.log('Products', results);

    res.json(results);
  });
});

//Get Over Due Balances
app.get('/api/overdue', (req, res) => {

  const sql = 'select p.OrderNumber, p.AmountPaid, total_Sum.TotalSum from payment p JOIN (SELECT OrderNumber, sum(Price) AS TotalSum FROM orderdetails group by OrderNumber) AS total_Sum ON p.OrderNumber = total_Sum.OrderNumber WHERE p.AmountPaid < total_Sum.TotalSum';

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'No Overdue Balances found' });

    console.log('overdue', results);

    res.json(results);
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

