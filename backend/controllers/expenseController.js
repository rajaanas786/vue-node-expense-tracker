const { addExpense } = require("../models/expenseModel");
const { getAllExpenses } = require("../models/expenseModel");

const createExpense = (req, res) => {
  const expenseData = req.body;

  addExpense(expenseData, (err, result) => {
    if (err) {
      console.error("❌ Expense insert error:", err.message);
      return res.status(500).json({ message: "Database error" });
    }

    res
      .status(201)
      .json({ message: "✅ Expense added successfully", data: result });
  });
};

//fetch all the expenses
const fetchAllExpenses = (req, res) => {
  getAllExpenses((err, results) => {
    if (err) {
      console.error("❌ Fetch error:", err.message);
      return res.status(500).json({ message: "Database error" });
    }

    res.status(200).json({ message: "✅ Expenses fetched", data: results });
  });
};

module.exports = { createExpense, fetchAllExpenses };
