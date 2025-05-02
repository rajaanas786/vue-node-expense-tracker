const express = require("express");
const cors = require("cors"); // 👈 yeh import karo

const app = express();
require("dotenv").config();
const db = require("./config/db");
const expenseRoutes = require("./routes/expenseRoutes");

app.use(cors()); // 👈 yeh line CORS ko allow karegi
app.use(express.json());

app.use("/api", expenseRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
