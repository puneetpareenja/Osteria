const functions = require("firebase-functions");
const app = require("express")();

const {
  signup,
  login,
  uploadUserImage,
  getAuthenticatedUser,
  getAllUsers
} = require("./handlers/users");

const {
  getAllItems,
  addItem,
  deleteItem,
  getItem,
  uploadItemImage,
  special,
  regular,
  getSpecials
} = require("./handlers/items");

const { fbAuth } = require("./util/fbAuth");

// User Routes
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", fbAuth, uploadUserImage);
app.get("/user", fbAuth, getAuthenticatedUser);
app.get("/users", getAllUsers);

// Item Routes
app.get("/items", getAllItems);
app.post("/addItem", fbAuth, addItem);
app.get("/item/:itemId", getItem);
app.delete("/item/:itemId", fbAuth, deleteItem);
app.post("/item/image/:itemId", fbAuth, uploadItemImage);
app.get("/item/:itemId/special", fbAuth, special);
app.get("/item/:itemId/regular", fbAuth, regular);
app.get("/specials", getSpecials);

// Exporting the API
exports.api = functions.https.onRequest(app);
