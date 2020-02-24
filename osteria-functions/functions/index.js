const functions = require("firebase-functions");
const app = require("express")();

const { signup, login } = require("./handlers/users");
const { getAllItems, addItem } = require("./handlers/items");
// User Routes
app.post("/signup", signup);
app.post("/login", login);

// Item Routes
app.get("/items", getAllItems);
app.post("/addItem", addItem);

// Exporting the API
exports.api = functions.https.onRequest(app);
