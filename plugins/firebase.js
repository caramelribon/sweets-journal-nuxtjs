import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyB3HxM5ujqlNBF8IEjy6q3HdgaUugqdlOM",
  authDomain: "sweets-journal-nuxtjs-62fe2.firebaseapp.com",
  projectId: "sweets-journal-nuxtjs-62fe2",
  storageBucket: "sweets-journal-nuxtjs-62fe2.appspot.com",
  messagingSenderId: "300918413123",
  appId: "1:300918413123:web:644cd8d0c3176e970a01f6",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}


export default firebase