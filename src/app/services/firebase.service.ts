import { Injectable } from '@angular/core';

// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { Database, getDatabase, ref, set } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk6OrxcLWYRU2r4cIUCT99tAE76n7pK_A",
  authDomain: "frontendfundamentals-9be86.firebaseapp.com",
  projectId: "frontendfundamentals-9be86",
  storageBucket: "frontendfundamentals-9be86.appspot.com",
  messagingSenderId: "468184184197",
  appId: "1:468184184197:web:a8b025835e012e230d40ec",
  measurementId: "G-LW2F6N7GLQ",
  databaseURL: "https://frontendfundamentals-9be86-default-rtdb.europe-west1.firebasedatabase.app",
};

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public app: FirebaseApp;
  public db: Database;

  constructor() {
    // Initialize Firebase
    this.app = initializeApp(firebaseConfig);
    this.db = getDatabase(this.app);
  }

  public async login(nickname: string) {
    this.db = getDatabase(this.app);
    await set(ref(this.db, 'users/' + nickname), {
      online: true
    });
  }

  public async logout(nickname: string){
    this.db = getDatabase(this.app);
    await set(ref(this.db, 'users/' + nickname), {
      online: false
    });
  }

  // this.ref.orderByChild('nickname').equalTo(login.nickname).once('value', snapshot => {
  //   if (snapshot.exists()) {
  //     localStorage.setItem('nickname', login.nickname);
  //     this.router.navigate(['/roomlist']);
  //   } else {
  //     const newUser = firebase.database().ref('users/').push();
  //     newUser.set(login);
  //     localStorage.setItem('nickname', login.nickname);
  //     this.router.navigate(['/roomlist']);
  //   }
  // });
}
