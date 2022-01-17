import { Injectable } from '@angular/core';

// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { Database, getDatabase, ref, set, onValue } from "firebase/database";
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Chat } from '../models/chat';
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
  public chats$ = new BehaviorSubject<Chat[]>([]);

  constructor() {
    // Initialize Firebase
    this.app = initializeApp(firebaseConfig);
    this.db = getDatabase(this.app);

    this.getOnlineUsers();
    this.getChats();
  }

  public async login(nickname: string) {
    localStorage.setItem('chatterbox', nickname);
    await set(ref(this.db, 'users/' + nickname), {
      nickname,
      online: true
    });
  }

  public async logout(nickname: string) {
    localStorage.removeItem('chatterbox');
    await set(ref(this.db, 'users/' + nickname), {
      nickname,
      online: false
    });
  }

  public async sendChat(chat: Chat) {
    await set(ref(this.db, 'chats/' + chat.date.getTime()), chat);
  }

  private getOnlineUsers() {
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

  private getChats() {
    const chatsDbRef = ref(this.db, 'chats/');
    onValue(chatsDbRef, (snapshot) => {
      const data = snapshot.val();
      // Convert data to array
      const chats = Object.values<Chat>(data);
      // Post chats Subject
      this.chats$.next(chats);
    });
  }

}
