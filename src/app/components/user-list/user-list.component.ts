import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {
  users$ = this.firebaseService.onlineUsers$;

  constructor(
    private firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
  }

}
