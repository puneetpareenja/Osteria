const { db, admin } = require("../util/admin");
const config = require("../util/config");

// Getting All the Items
exports.getAllItems = (request, response) => {
  db.collection("items")
    .orderBy("category")
    .get()
    .then((data) => {
      let items = [];
      data.forEach((doc) => {
        items.push({
          itemId: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          price: doc.data().price,
          category: doc.data().category,
          imageUrl: doc.data().imageUrl,
          special: doc.data().special,
        });
      });
      return response.json(items);
    })
    .catch((err) => {
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
    imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/items%2F${noImage}?alt=media`,
    special: false,
  };

  db.collection("items")
    .add(newItem)
    .then((doc) => {
      response.json({
        id: doc.id,
        ...newItem,
      });
    })
    .catch((error) => {
      response.status(500).json({ message: `something went wrong` });
      console.log(error);
    });
};

// Fetch one Item
exports.getItem = (req, res) => {
  db.doc(`/items/${req.params.itemId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Item not found" });
      }
      itemData = doc.data();
      itemData.itemId = doc.id;
      return res.json(itemData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// Delete a Item
exports.deleteItem = (req, res) => {
  const document = db.doc(`/items/${req.params.itemId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Item not found" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "Item deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.uploadItemImage = (request, response) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = new BusBoy({ headers: request.headers });

  let imageFileName;
  let imageToBeUploaded = {};

  const itemId = request.params.itemId;

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
      return response.status(400).json({ error: "Wrong File Type Submitted" });
    }
    const imageExtension = filename.split(".")[filename.split(".").length - 1];
    imageFileName = `${itemId}.${imageExtension}`;
    console.log(imageFileName);
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });

  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        destination: `items/${imageFileName}`,
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
          },
        },
      })
      .then(() => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/items%2F${imageFileName}?alt=media`;
        return db.doc(`/items/${itemId}`).update({ imageUrl });
      })
      .then(() => {
        return response.json({ message: "Image Uploaded successfully" });
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code });
      });
  });

  busboy.end(request.rawBody);
};

exports.special = (request, response) => {
  const itemId = request.params.itemId;
  const special = true;
  return db
    .doc(`items/${itemId}`)
    .update({ special })
    .then(() => {
      return response.json({ message: "Item added to Specials" });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.regular = (request, response) => {
  const itemId = request.params.itemId;
  const special = false;
  return db
    .doc(`items/${itemId}`)
    .update({ special })
    .then(() => {
      return response.json({ message: "Item removed from Specials" });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.getSpecials = (request, response) => {
  db.collection("items")
    .where("special", "==", true)
    .get()
    .then((data) => {
      let items = [];
      data.forEach((doc) => {
        items.push({
          itemId: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          price: doc.data().price,
          category: doc.data().category,
          imageUrl: doc.data().imageUrl,
          special: doc.data().special,
        });
      });
      return response.json(items);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getItemPriceByName = (request, response) => {
  const name = request.params.name;
  db.collection("items")
    .where("name", "==", name)
    .get()
    .then((data) => {
      let price = 0;
      data.forEach((doc) => {
        return response.json({ price: doc.data().price });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
