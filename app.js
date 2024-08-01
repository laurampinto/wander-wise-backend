require("dotenv").config();

require("./db");

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = 5005;

const app = express();

require("./config")(app);

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 👇 Start handling routes here
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const attactionsRoutes = require("./routes/attractions.routes");
app.use("/api/attractions", attactionsRoutes);

const commentsRoutes = require("./routes/comments.routes")
app.use("/api/comments", commentsRoutes)

require("./error-handling")(app);

module.exports = app;
