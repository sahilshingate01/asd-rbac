const express = require("express");
const { users, posts } = require("./data/db");
const authenticate = require("./middleware/authenticate");
const authorize = require("./middleware/authorize");

const app = express();
app.use(express.json());


app.post("/login", (req, res) => {
  
});


// Any logged-in user
app.get("/profile", authenticate, (req, res) => {
  res.json({ message: "Your profile", user: req.user });
});

// Moderators and admins only
app.get("/reports", authenticate, authorize("moderator", "admin"), (req, res) => {
  res.json({ message: "Here are the flagged reports" });
});

// Admins only
app.delete("/users/:id", authenticate, authorize("admin"), (req, res) => {
  res.json({ message: `User ${req.params.id} deleted` });
});

// ---------------------------------------------------------------
// BONUS: RBAC + OWNERSHIP
// Users can delete their OWN posts; admins can delete ANY post.
// ---------------------------------------------------------------
app.delete("/posts/:id", authenticate, (req, res) => {
  
});

// Start the server only when run directly (lets test.js import the app)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

module.exports = app;
