// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// import * as firestore from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCMYe5-xLajJUYk7m4NGYtf_Q0paA7Y0mQ",
    authDomain: "mysalary-76f36.firebaseapp.com",
    projectId: "mysalary-76f36",
    storageBucket: "mysalary-76f36.appspot.com",
    messagingSenderId: "659721302865",
    appId: "1:659721302865:web:41510343096424c67a9970",
    measurementId: "G-5JZK69PDML"
};

// Initialize Firebase
// console.log(firebase)
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}
const auth = firebase.auth();
// console.log(firestore)
export const db = firebase.firestore(app)
export { auth };