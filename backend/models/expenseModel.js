const db = require("../config/db");

const addExpense = (expenseData, callback) => {
  const { title, amount, category, date } = expenseData;

  const query =
    "INSERT INTO expenses (title, amount, category, date) VALUES (?, ?, ?, ?)";
  const values = [title, amount, category, date];

  console.log("Running Query:", query);
  console.log("With Values:", values);

  db.query(query, values, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

//get all the expenses

const getAllExpenses = (callback) => {
  const query =
    "SELECT * FROM expenses WHERE is_deleted = 0 ORDER BY date DESC";
  db.query(query, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

module.exports = {
  addExpense,
  getAllExpenses,
};
