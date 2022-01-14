import { Component } from '@angular/core';
// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";

// Your web app's Firebase configuration
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

  app: FirebaseApp;

  constructor() {
    // Initialize Firebase
    this.app = initializeApp(firebaseConfig);
  }
}
