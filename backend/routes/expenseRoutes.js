const express = require("express");
const router = express.Router();
const { createExpense } = require("../controllers/expenseController");
const { fetchAllExpenses } = require("../controllers/expenseController");

router.post("/expenses", createExpense);
router.get("/expenses", fetchAllExpenses);

module.exports = router;
