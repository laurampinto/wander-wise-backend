const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
  try {
    if (
      req.headers.authorization.split(" ")[0] === "Bearer" &&
      req.headers.authorization.split(" ")[1]
    ) {
      const token = req.headers.authorization.split(" ")[1];

      const payload = jwt.verify(token, process.env.TOKEN_SECRET);

      req.payload = payload;

      next();
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
}

module.exports = {
  isAuthenticated,
};
