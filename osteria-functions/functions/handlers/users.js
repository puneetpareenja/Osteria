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
    confirmPassword: request.body.confirmPassword
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
        userId
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

  console.log(validateLoginData(user));
  const { valid, errors } = validateLoginData(user);

  if (!valid) return response.status(400).json(errors);

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
        return response.status(400).json({ general: "Invalid credentials" });
      } else {
        return response.status(500).json({ error: err.code });
      }
    });
};
