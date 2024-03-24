// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  ref,
  set,
  getDatabase,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
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
const database = getDatabase();

var fullname = document.getElementById("fullname");
var email = document.getElementById("email");
var phone = document.getElementById("phone");
var message = document.getElementById("message");

var showRow = document.getElementById("showRow");
var getUser;

window.add = function () {
  var obj = {
    Fullname: fullname.value,
    Email: email.value,
    Phone: phone.value,
    Message: message.value,
  };

  obj.id = push(ref(database, "userContact/")).key;
  var reference = ref(database, `userContact/${obj.id}`);
  set(reference, obj);

  // Show alert
  alert("Form submitted successfully!");

  // Clear all fields after submission

  fullname.value = "";
  email.value = "";
  phone.value = "";
  message.value = "";
};

function userList() {
  showRow.innerHTML = "";
  for (var i = 0; i < getUser.length; i++) {
    showRow.innerHTML += `<tr>
    <td>${getUser[i].Fullname}  ${getUser[i].Fathername}</td>
    <td>${getUser[i].Email}</td>
    <td>${getUser[i].Phone}</td>
    <td>${getUser[i].Message}</td>
  </tr>`;
  }
}

function getData() {
  var reference = ref(database, "userContact/");

  onValue(reference, function (data) {
    console.log(data.val());
    getUser = Object.values(data.val());
    userList();
  });
}
getData();
