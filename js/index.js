var firebaseConfig = {
    apiKey: "AIzaSyC0sYlaAovLJtC81vrxEI-Zdlr5Hvgr5nc",
    authDomain: "osteria-xqgodr.firebaseapp.com",
    databaseURL: "https://osteria-xqgodr.firebaseio.com",
    projectId: "osteria-xqgodr",
    storageBucket: "osteria-xqgodr.appspot.com",
    messagingSenderId: "997460118977",
    appId: "1:997460118977:web:006892600201920a623340",
    measurementId: "G-L90NJZL7W3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function checkAuthState() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user);
            window.location.href = "../pages/home.html";
        } else {
            console.log(" Not Authenticated");
            window.location.href = "../user/signin.html";
        }
    });
}

$('#btnLogin').click(() => {
    var email = $('#email').val();
    var password = $('#password').val();

    if (email != "" && password != "") {
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(checkAuthState)
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error);
                // ...
            });
    }
})

$('#btnLogout').click(() => {
    firebase.auth()
        .signOut()
        .then(checkAuthState).catch(function (error) {
            console.log(error);
        });
})

$('#btnRegister').click(() => {
    var email = $('#email').val();
    var password = $('#password').val();
    var conPassword = $('#confirmPassword').val();


    if (email != "" && password != "" && conPassword != "") {
        if (password == conPassword) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(checkAuthState)
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
              });
        }
        else
            window.alert("Passwords do not match.");
        
    }
    else
        window.alert("Please fill out all the fields.");

})