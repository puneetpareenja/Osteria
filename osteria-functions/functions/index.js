const functions = require("firebase-functions");
const app = require("express")();
const { db, admin } = require("./util/admin");

const {
  signup,
  login,
  uploadUserImage,
  getAuthenticatedUser,
  getAllUsers,
  setActive,
  setInactive,
} = require("./handlers/users");

const {
  getAllItems,
  addItem,
  deleteItem,
  getItem,
  uploadItemImage,
  special,
  regular,
  getSpecials,
  getItemPriceByName,
} = require("./handlers/items");

const { getAllOrders, completeOrder, getOrder } = require("./handlers/orders");

const { fbAuth } = require("./util/fbAuth");

// User Routes
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", fbAuth, uploadUserImage);
app.get("/user", fbAuth, getAuthenticatedUser);
app.get("/users", getAllUsers);
app.get("/user/activate/:email", setActive);
app.get("/user/deactivate/:email", setInactive);

// Item Routes
app.get("/items", getAllItems);
app.post("/addItem", fbAuth, addItem);
app.get("/item/:itemId", getItem);
app.delete("/item/:itemId", fbAuth, deleteItem);
app.post("/item/image/:itemId", fbAuth, uploadItemImage);
app.get("/item/:itemId/special", fbAuth, special);
app.get("/item/:itemId/regular", fbAuth, regular);
app.get("/specials", getSpecials);
app.get("/item/price/:name", getItemPriceByName);

// Order Routes
app.get("/orders", getAllOrders);
app.get("/order/complete/:orderId", completeOrder);
app.get("/order/:orderId", getOrder);

// Exporting the API
exports.api = functions.https.onRequest(app);

//Triggers
exports.updateOrderStatusOnCreate = functions.firestore
  .document("orders/{id}")
  .onCreate((snapshot) => {
    console.log(`/orders/${snapshot.id}`);
    return db
      .doc(`/orders/${snapshot.id}`)
      .update({ complete: false })
      .catch((err) => console.error(err));
  });
