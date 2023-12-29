const { Admin } = require("../db/index");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  try {
    const { username, password } = req.headers;
    console.log(`Admin middleware -- ${username},${password}`);
    const admin = await Admin.where({ username: username }).findOne();
    if (!admin) {
      return res.status(401).json({ error: "Admin doesn't exist" });
    }
    if (admin != password) {
      return res.status(401).json({ error: "Wrong password" });
    }
    next();
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = adminMiddleware;
