
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyC1T6859x4g0rRlYgQBzeQ24SdpWgQrpMQ",
    authDomain: "manmodefits.firebaseapp.com",
    databaseURL: "https://manmodefits-default-rtdb.firebaseio.com",
    projectId: "manmodefits",
    storageBucket: "manmodefits.firebasestorage.app",
    messagingSenderId: "167586381336",
    appId: "1:167586381336:web:dc2933a9e4025ed84a8d6d",
    measurementId: "G-YNDPZHLXMJ"
  };

const firebaseConfig = {
  //   copy your firebase config informations
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var emailid = getElementVal("emailid");
  var msgContent = getElementVal("msgContent");

  saveMessages(name, emailid, msgContent);

  //   enable alert
  document.querySelector(".alert").style.display = "block";

  //   remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  //   reset the form
  document.getElementById("contactForm").reset();
}

const saveMessages = (name, emailid, msgContent) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    name: name,
    emailid: emailid,
    msgContent: msgContent,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};