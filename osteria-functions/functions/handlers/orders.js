const { db, admin } = require("../util/admin");
const config = require("../util/config");

exports.getAllOrders = (request, response) => {
  db.collection("orders")
    .get()
    .then((data) => {
      let orders = [];
      data.forEach((doc) => {
        if (doc.exists) {
          items = [];
          let jsonDoc = doc.data();
          var keys = Object.keys(jsonDoc);
          keys.forEach((key) => {
            if (
              key != "table" &&
              key != "createdAt" &&
              key != "completed" &&
              key != "email" &&
              key != "invoice" &&
              key != "total"
            ) {
              items.push(jsonDoc[key]);
            }
          });
          orders.push({
            id: doc.id,
            table: doc.data().table,
            email: doc.data().email,
            createdAt: doc.data().createdAt,
            completed: doc.data().completed,
            items,
          });
        }
      });
      return response.json(orders);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getOrder = (request, response) => {
  const orderId = request.params.orderId;

  db.doc(`/orders/${request.params.orderId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Order not found" });
      }
      items = [];
      let jsonDoc = doc.data();
      var keys = Object.keys(jsonDoc);
      keys.forEach((key) => {
        if (
          key != "table" &&
          key != "createdAt" &&
          key != "completed" &&
          key != "email" &&
          key != "invoice" &&
          key != "total"
        ) {
          items.push(jsonDoc[key]);
        }
      });
      return response.json({
        id: doc.id,
        table: doc.data().table,
        email: doc.data().email,
        createdAt: doc.data().createdAt,
        completed: doc.data().completed,
        items,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.completeOrder = (request, response) => {
  const orderId = request.params.orderId;
  const completed = true;
  return db
    .doc(`orders/${orderId}`)
    .update({ completed })
    .then(() => {
      return response.json({ message: "Order Completed" });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};
