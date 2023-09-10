import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref,set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCP2Jnq3dveqFrW70ZmA_vEPdmJ8e0HWgI",
    authDomain: "attendance-portal-70ca0.firebaseapp.com",
    databaseURL: "https://attendance-portal-70ca0-default-rtdb.firebaseio.com",
    projectId: "attendance-portal-70ca0",
    storageBucket: "attendance-portal-70ca0.appspot.com",
    messagingSenderId: "408112942697",
    appId: "1:408112942697:web:8a032273f3d711de0d1cf8"
  };
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const submitButton = document.getElementById("submit");
const signupButton = document.getElementById("sign-up");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const main = document.getElementById("main");
const createacct = document.getElementById("create-acct")

const signupEmailIn = document.getElementById("email-signup");
const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
const createacctbtn = document.getElementById("create-acct-btn");

const returnBtn = document.getElementById("return-btn");

var email, password, signupEmail, signupPassword, confirmSignupEmail, confirmSignUpPassword;

createacctbtn.addEventListener("click", function() {
  var isVerified = true;

  signupEmail = signupEmailIn.value;
  confirmSignupEmail = confirmSignupEmailIn.value;
  if(signupEmail != confirmSignupEmail) {
      // window.alert("only admin have right")
      isVerified = false;
  }

  signupPassword = signupPasswordIn.value;
  confirmSignUpPassword = confirmSignUpPasswordIn.value;
  if(signupPassword != confirmSignUpPassword) {
    window.alert("only admin have right")
      isVerified = false;
      signupEmailIn.value = ""
      confirmSignupEmailIn.value = ""
      signupPasswordIn.value = ""
      confirmSignUpPasswordIn.value = ""
  }
  
  if(signupEmail == null || confirmSignupEmail == null || signupPassword == null || confirmSignUpPassword == null) {
    window.alert("Please fill out all required fields.");
    isVerified = false;
  }
  
  if(isVerified) {
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((adminCredential) => {
      // Signed in 
      var admin = adminCredential.admin;
      // ...
      window.alert("Success! Account created.");
      let uniqueuid = auth.currentUser.uid;
      let adminRef = ref(database,"admin/"+ uniqueuid);
      let obj = {
        email:signupEmailIn.value,
        confirm : confirmSignupEmailIn.value,
        password: signupPasswordIn.value,
        confirmpassword: confirmSignUpPasswordIn.value,

      };
      set(adminRef,obj)
      .then((adminCredential) =>{
        console.log("succecssfully your data added in database",adminCredential)
      })
      .catch((error)=>{
        console.log("error adding data", error)
      })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      window.alert("Error occurred. Try again.");
    });
  }
});

submitButton.addEventListener("click", function() {
  email = emailInput.value;
  console.log(email);
  password = passwordInput.value;
  console.log(password);


  
  signInWithEmailAndPassword(auth, email, password)
    .then((adminCredential) => {
      // Signed in
      var admin= adminCredential.admin;
      console.log("Success! Welcome back!");
      window.alert("Success! Welcome back!");
      emailInput.value = ""
      passwordInput.value= ""
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error occurred. Try again.");
      window.alert("Error occurred. Try again.");
    });

    
  
});

signupButton.addEventListener("click", function() {
    main.style.display = "none";
    createacct.style.display = "block";
});

returnBtn.addEventListener("click", function() {
    main.style.display = "block";
    createacct.style.display = "none";
});

