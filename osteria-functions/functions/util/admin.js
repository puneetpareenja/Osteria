const admin = require("firebase-admin");

// For Firebase Deploy
// admin.initializeApp();

// Fetch the service account key JSON file contents
var serviceAccount = require("../../keys/serviceAccountKey.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //   databaseURL: "https://osteria-xqgodr.firebaseio.com",
  storageBucket: "osteria-xqgodr.appspot.com"
});

const db = admin.firestore();

module.exports = { admin, db };
