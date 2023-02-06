const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("../backend/config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT;

connectDB();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// serve fontend

app.use(errorHandler);

app.listen(port, () =>
  console.log(`server started on port http://localhost:${port}/api/goals `)
);
