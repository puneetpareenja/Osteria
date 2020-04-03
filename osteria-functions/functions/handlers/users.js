const { admin, db } = require("../util/admin");
const config = require("../util/config");

const firebase = require("firebase");
firebase.initializeApp(config);

const { validateSignUpData, validateLoginData } = require("../util/validators");

exports.signup = (request, response) => {
  const newUser = {
    name: request.body.name,
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
    type: request.body.type,
    active: true
  };

  const { valid, errors } = validateSignUpData(newUser);

  if (!valid) return response.status(400).json(errors);

  const noImage = "no-image.png";

  let token;
  let userId;

  db.doc(`/users/${newUser.email}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return response
          .status(400)
          .json({ email: "This email is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then(idToken => {
      token = idToken;
      const userCredentials = {
        name: newUser.name,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/users%2F${noImage}?alt=media`,
        type: newUser.type,
        userId,
        active: newUser.active
      };
      return db.doc(`/users/${newUser.email}`).set(userCredentials);
    })
    .then(() => {
      return response.status(201).json({ token });
    })
    .catch(err => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return response.status(400).json({ email: "Email is already in user" });
      } else {
        return response.status(500).json({ error: err.code });
      }
    });
};

exports.login = (request, response) => {
  const user = {
    email: request.body.email,
    password: request.body.password
  };

  const { valid, errors } = validateLoginData(user);

  if (!valid) return response.status(400).json(errors);

  db.doc(`/users/${user.email}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        if (!doc.data().active) {
          return response
            .status(400)
            .json({ general: "Account is disabled. Contact admin" });
        } else {
          firebase
            .auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then(data => {
              return data.user.getIdToken();
            })
            .then(token => {
              return response.json({ token });
            })
            .catch(err => {
              console.error(err);
              if (
                err.code === "auth/wrong-password" ||
                err.code === "auth/user-not-found"
              ) {
                return response
                  .status(400)
                  .json({ general: "Invalid credentials" });
              } else {
                return response.status(500).json({ error: err.code });
              }
            });
        }
      }
    })
    .catch(err => {
      console.error(err);
    });
};

exports.getAuthenticatedUser = (request, response) => {
  console.log("inside");
  let userData = {};
  db.doc(`users/${request.user.email}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        userData.credentials = doc.data();
      }
      return response.json(userData);
    })
    .catch(err => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.uploadUserImage = (request, response) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = new BusBoy({ headers: request.headers });

  let imageFileName;
  let imageToBeUploaded = {};

  const userId = request.user.uid;

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
      return response.status(400).json({ error: "Wrong File Type Submitted" });
    }
    const imageExtension = filename.split(".")[filename.split(".").length - 1];
    imageFileName = `${userId}.${imageExtension}`;
    console.log("imageFileName", imageFileName);
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });

  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        destination: `users/${imageFileName}`,
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype
          }
        }
      })
      .then(() => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/users%2F${imageFileName}?alt=media`;
        return db.doc(`/users/${request.user.email}`).update({ imageUrl });
      })
      .then(() => {
        return response.json({ message: "Image Uploaded successfully" });
      })
      .catch(err => {
        console.error(err);
        return response.status(500).json({ error: err.code });
      });
  });

  busboy.end(request.rawBody);
};

exports.getAllUsers = (request, response) => {
  db.collection("users")
    .orderBy("active", "desc")
    .get()
    .then(data => {
      let employees = [];
      data.forEach(doc => {
        employees.push({
          id: doc.data().userId,
          name: doc.data().name,
          email: doc.data().email,
          type: doc.data().type,
          imageUrl: doc.data().imageUrl,
          active: doc.data().active
        });
      });
      return response.json(employees);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.setActive = (request, response) => {
  const email = request.params.email;
  const active = true;
  return db
    .doc(`users/${email}`)
    .update({ active })
    .then(() => {
      return response.json({ message: "User activated" });
    })
    .catch(err => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.setInactive = (request, response) => {
  const email = request.params.email;
  const active = false;
  return db
    .doc(`users/${email}`)
    .update({ active })
    .then(() => {
      return response.json({ message: "User deactivated" });
    })
    .catch(err => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};
