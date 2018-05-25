function saveUserProfile() {
    var db = firebase.firestore();
    var currentUser = firebase.auth().currentUser;
    var userFullname = document.getElementById("userFullname").value;
    var userTelephone = document.getElementById("userTelephone").value;
    db.collection("profiles").doc(currentUser.uid).set({
        userFullname: userFullname,
        userTelephone: userTelephone
    }).then(function () {
        console.log("Add userProfile Complete");
    });
}

function readUserProfile() {
    var db = firebase.firestore();
    var currentUser = firebase.auth().currentUser;
    db.doc('profiles/' + currentUser.uid).get().then(
        function (documentSnapshot) {
            document.getElementById('userProfileResult').innerHTML =
                documentSnapshot.data().userFullname + " " +
                documentSnapshot.data().userTelephone
        }
    );
}

function addFriend() {
    var db = firebase.firestore();
    var currentUser = firebase.auth().currentUser;
    var fullname = document.getElementById("friendFullname").value;
    var age = document.getElementById("friendAge").value;
    db.collection("friends").add({
        userId: currentUser.uid,
        fullname: fullname,
        age: age
    }).then(function (docRef) {
        console.log("Add with ID: " + docRef.id);
    }).catch(function (error) {
        console.log(error);
    });
}

function getFriend() {
    var db = firebase.firestore();
    var currentUser = firebase.auth().currentUser;
    db.collection('friends').get()
        .then(function (querySnapshot) {
            let abc = '';
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                abc += doc.data().fullname + ' ' + doc.data().age + '<br>';
            });
            document.getElementById('friendsResult').innerHTML = abc;
        }
        );
}