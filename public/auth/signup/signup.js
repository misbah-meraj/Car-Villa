// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import {
  getStorage,
  ref as strRef,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWy7AwsF5u4b8dTqPau9RfSxUrfEDngDY",
  authDomain: "showroom-7315d.firebaseapp.com",
  databaseURL: "https://showroom-7315d-default-rtdb.firebaseio.com",
  projectId: "showroom-7315d",
  storageBucket: "showroom-7315d.appspot.com",
  messagingSenderId: "537327969077",
  appId: "1:537327969077:web:a6cf784cce920c3034a27c",
  measurementId: "G-P54C23FRP4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
const auth = getAuth();
const storage = getStorage();

var userName = document.getElementById("userName");
var email = document.getElementById("email");
var password = document.getElementById("password");

window.signupUser = function () {
  var obj = {
    userName: userName.value,
    email: email.value,
    password: password.value,
  };
  console.log(obj);
  createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (res) {
      console.log("User Created Successfully", res);

      obj.id = res.user.uid;

      var reference = ref(db, `users/${obj.id}`);
      set(reference, obj)
        .then(function () {
          console.log("User Added in Database");
          window.location.href = "../../index.html";
        })
        .catch(function (dbError) {
          console.log("Database Error", dbError);
        });
      userName.value = "";
      email.value = "";
      password.value = "";
    })
    .catch(function (err) {
      console.log(err);
    });
};

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
// } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// import {
//   ref,
//   getDatabase,
//   set,
// } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyD_6dgOgzoUa74XYp5k2GJdH72rkaqjoRk",
//   authDomain: "book-shelf-store-368f7.firebaseapp.com",
//   projectId: "book-shelf-store-368f7",
//   storageBucket: "book-shelf-store-368f7.appspot.com",
//   messagingSenderId: "660129325380",
//   appId: "1:660129325380:web:332ba80e05d8d4962c3711",
//   measurementId: "G-BX5X59HTP8"
// };

// // Initialize Firebase

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const database = getDatabase();
// const auth = getAuth();

// var model = {};
// var userName = document.getElementById("userName");
// var email = document.getElementById("email");
// var password = document.getElementById("password");

// window.signupUser = function () {
//   var obj = {
//       userName: userName.value,
//       email: email.value,
//       password: password.value
//   }
//   console.log(obj)
//   createUserWithEmailAndPassword(auth, obj.email, obj.password)
//       .then(function (res) {
//           console.log("User Created Successfully",res)

//           obj.id = res.user.uid

//           var reference = ref(db,`users/${obj.id}`)
//           set(reference,obj).then(function(){
//               console.log("User Added in Database")
//           }).catch(function(dbError){
//               console.log("Database Error",dbError)
//           })
//       }).catch(function(err){
//           console.log(err)
//       })
// }
