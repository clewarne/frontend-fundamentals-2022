import { Injectable } from '@angular/core';

// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { Database, getDatabase, ref, set, onValue } from "firebase/database";
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../models/user';

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

  public onlineUsers$ = new BehaviorSubject<User[]>([]);

  constructor() {
    // Initialize Firebase
    this.app = initializeApp(firebaseConfig);
    this.db = getDatabase(this.app);

    this.getOnlineUsers();
  }

  public async login(nickname: string) {
    await set(ref(this.db, 'users/' + nickname), {
      nickname,
      online: true
    });
  }

  public async logout(nickname: string) {
    await set(ref(this.db, 'users/' + nickname), {
      nickname,
      online: false
    });
  }

  public getOnlineUsers() {
    // Listen to changes in users db and get online users
    const usersDbRef = ref(this.db, 'users/');
    onValue(usersDbRef, (snapshot) => {
      const data = snapshot.val();
      // Convert data to array and filter for only online users
      const onlineUsers = Object.values<User>(data).filter(user => user.online);
      // Post online users on Subject
      this.onlineUsers$.next(onlineUsers);
    });
  }

}
