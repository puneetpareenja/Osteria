const functions = require("firebase-functions");
const app = require("express")();

const {
  signup,
  login,
  uploadUserImage,
  getAuthenticatedUser
} = require("./handlers/users");

const {
  getAllItems,
  addItem,
  deleteItem,
  getItem,
  uploadItemImage
} = require("./handlers/items");

const { fbAuth } = require("./util/fbAuth");

// User Routes
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", fbAuth, uploadUserImage);
app.get("/user", fbAuth, getAuthenticatedUser);

// Item Routes
app.get("/items", getAllItems);
app.post("/addItem", fbAuth, addItem);
app.get("/item/:itemId", getItem);
app.delete("/item/:itemId", fbAuth, deleteItem);
app.post("/item/image/:itemId", fbAuth, uploadItemImage);

// Exporting the API
exports.api = functions.https.onRequest(app);
