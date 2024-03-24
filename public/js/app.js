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
  getAuth,
  onAuthStateChanged,
  signOut,
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

// var main = document.getElementById("main");
var userBox = document.getElementById("userBox");
var userName = document.getElementById("userName");
var products = [];

function renderProducts(containerId) {
  var main = document.getElementById(containerId);

  main.innerHTML = "";
  for (var i = 0; i < products.length; i++) {
    var x = products[i];

    main.innerHTML += `
    <div class="col-11 col-sm-6 col-md-4 col-lg-3 my-2"onclick="cardClick('${x.id}')" >
    <div class="card"  >
    <!-- Card image -->
    <div class="view overlay">
      <img
        class="card-img-top"
        src="${x.imgUrl}"
        alt="Card image cap"
        style="max-height:25vh"
      />
      <a>
        <div class="mask rgba-white-slight"></div>
      </a>
    </div>

    <!-- Card content -->
    <div class="card-body elegant-color white-text rounded-bottom" onclick="cardClick('${x.id}')">
      <!-- Social shares button -->
      
      <!-- Title -->
      <h4 class="card-title">${x.title}</h4>
      <hr class="hr-light" />
      <!-- Text -->
      <p class="card-text white-text mb-4">
      ${x.description}
      </p>
      <!-- Link -->
      <button class="btn btn-dark text-white d-flex justify-content-end" onclick="cardClick('${x.id}')">
        <h5>Read more <i class="fas fa-angle-double-right"></i></h5>
      </button>
    </div>
  </div>
  </div>
      `;
  }
}

function getProduct() {
  var reference = ref(db, `cars/`);

  onValue(reference, function (data) {
    console.log(data.val());
    products = Object.values(data.val());
    renderProducts("all-car");
    // renderProducts("category");
    // renderProducts("all-book-home")
  });
}
getProduct();

function checkAuth() {
  onAuthStateChanged(auth, function (user) {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log(uid);

      var userObj = localStorage.getItem("userData");
      userObj = JSON.parse(userObj);

      userBox.style.display = "block";
      userName.innerHTML = userObj.userName;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
}
checkAuth();

window.logoutUser = function (userData) {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("abc");
      localStorage.removeItem(userData);
      location.reload();
    })
    .catch((error) => {
      console.log(error);
      // An error happened.
    });
};

window.cardClick = function (id) {
  localStorage.setItem("productId", id);
  window.location.assign("./Pages/single-product/singleproduct.html");
};
