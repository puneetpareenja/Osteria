const { db, admin } = require("../util/admin");
const config = require("../util/config");

exports.getAllOrders = (request, response) => {
  db.collection("orders")
    .where("completed", "==", false)
    .get()
    .then(data => {
      let orders = [];
      data.forEach(doc => {
        if (doc.exists) {
          items = [];
          let jsonDoc = doc.data();
          var keys = Object.keys(jsonDoc);
          keys.forEach(key => {
            if (
              key != "table" &&
              key != "createdAt" &&
              key != "completed" &&
              key != "email"
            ) {
              items.push(jsonDoc[key]);
            }
          });

          orders.push({
            table: doc.data().table,
            email: doc.data().email,
            createdAt: doc.data().createdAt,
            completed: doc.data().completed,
            items
          });
        }
      });
      return response.json({ orders });
    })
    .catch(err => {
      console.log(err);
    });
};
