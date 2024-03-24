import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";

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

var carImage = document.getElementById("carImage");
var carTitle = document.getElementById("carTitle");
var carDescription = document.getElementById("carDescription");
var carColor = document.getElementById("carColor");
var carYear = document.getElementById("carYear");
var carPrice = document.getElementById("carPrice");

var productId = localStorage.getItem("productId");

function checkAuth() {
  onAuthStateChanged(auth, function (user) {
    if (user) {
      const uid = user.uid;
      console.log(uid);

      var userObj = localStorage.getItem("userData");
      userObj = JSON.parse(userObj);

      userBox.style.display = "block";
      userName.innerHTML = userObj.userName;
      // ...
    } else {
      // User is signed out
    }
  });
}
checkAuth();

window.logoutUser = function () {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      localStorage.removeItem("userData");
    })
    .catch((error) => {});
};

var productResponse;
function getProduct() {
  var reference = ref(db, `cars/${productId}`);

  onValue(reference, function (data) {
    productResponse = data.val();
    console.log(productResponse);

    carImage.src = productResponse.imgUrl;
    carTitle.innerHTML = productResponse.title;
    carDescription.innerHTML = productResponse.description;
    carColor.innerHTML = productResponse.color;
    carYear.innerHTML = productResponse.year;
    carPrice.innerHTML = productResponse.price;
  });
}
getProduct();

window.placeOrder = function () {
  var loginUser = localStorage.getItem("userData");
  if (!loginUser) {
    alert("User Must be Login to Place Order");
    window.location.assign("../login/login.html");
  } else {
    var user = JSON.parse(localStorage.getItem("userData"));
    var obj = {
      userName: user.userName,
      userEmail: user.email,
      image: productResponse.imgUrl,
      carTitle: productResponse.title,
    };

    obj.id = push(ref(db, "orders/")).key;
    var reference = ref(db, `orders/${obj.id}`);

    set(reference, obj)
      .then(function () {
        alert("Order Placed Successfully");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};
