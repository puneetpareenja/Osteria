const { db } = require("../util/admin");
const config = require("../util/config");

// Getting All the Items
exports.getAllItems = (request, response) => {
  db.collection("items")
    .orderBy("category")
    .get()
    .then(data => {
      let screams = [];
      data.forEach(doc => {
        screams.push({
          itemId: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          price: doc.data().price,
          category: doc.data().category,
          imageUrl: doc.data().imageUrl
        });
      });
      return response.json(screams);
    })
    .catch(err => {
      console.log(err);
    });
};

// Adding new Item
exports.addItem = (request, response) => {
  const noImage = "no-item-image.png";

  const newItem = {
    description: request.body.description,
    name: request.body.name,
    price: request.body.price,
    category: request.body.category,
    imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/items/${noImage}?alt=media`
  };

  db.collection("items")
    .add(newItem)
    .then(doc => {
      response.json({ message: `document ${doc.id} created successfully` });
    })
    .catch(error => {
      response.status(500).json({ message: `something went wrong` });
      console.log(error);
    });
};

// Fetch one Item
exports.getItem = (req, res) => {
  db.doc(`/items/${req.params.itemId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Item not found" });
      }
      itemData = doc.data();
      itemData.itemId = doc.id;
      return res.json(itemData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// Delete a Item
exports.deleteItem = (req, res) => {
  const document = db.doc(`/items/${req.params.itemId}`);
  document
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Item not found" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "Item deleted successfully" });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
