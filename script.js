const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
// Show reCAPTCHA
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sendBtn', {
  size: 'invisible'
});

function sendOTP() {
  const phoneNumber = document.getElementById("identifier").value;
  const appVerifier = window.recaptchaVerifier;
  auth.signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(confirmationResult => {
      window.confirmationResult = confirmationResult;
      alert("OTP sent!");
    })
    .catch(error => {
      console.error(error);
    });
}

function verifyOTP() {
  const code = document.getElementById("otp").value;
  window.confirmationResult.confirm(code).then(result => {
    // Success -> Redirect
    window.location.href = "index.html";
  }).catch(error => {
    alert("Invalid OTP");
  });
}
