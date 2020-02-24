const { db } = require("../util/admin");
const config = require("../util/config");

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

exports.addItem = (request, response) => {
  const noImage = "no-item-image.png";

  const newItem = {
    description: request.body.description,
    name: request.body.name,
    price: request.body.price,
    category: request.body.category,
    imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/items/${noImage}?alt=media`
  };

  console.log(newItem);
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
