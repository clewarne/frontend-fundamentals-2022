import { Component } from '@angular/core';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAk6OrxcLWYRU2r4cIUCT99tAE76n7pK_A",
  authDomain: "frontendfundamentals-9be86.firebaseapp.com",
  projectId: "frontendfundamentals-9be86",
  storageBucket: "frontendfundamentals-9be86.appspot.com",
  messagingSenderId: "468184184197",
  appId: "1:468184184197:web:a8b025835e012e230d40ec",
  measurementId: "G-LW2F6N7GLQ",
  databaseURL: "https://frontendfundamentals-9be86-default-rtdb.europe-west1.firebasedatabase.app"
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'chatterbox';

  constructor() {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
  }
}
