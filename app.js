require("dotenv").config();

require("./db");

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = 5005;

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wander-wise-backend")
  .then((x) => console.log("Connect to the database", x.connections[0].name))
  .catch((err) => console.error("Error connecting to MongoDB", err));

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

require("./error-handling")(app);

// START SERVER
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
  
module.exports = app;
