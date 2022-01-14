import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export const snapshotToArray = (snapshot: any) => {
  const returnArr: any[] = [];

  snapshot.forEach((childSnapshot: any) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.less']
})
export class ChatroomComponent implements OnInit {
  @ViewChild('chatcontent') chatcontent!: ElementRef;
  scrolltop: number = 0;

  chatForm!: FormGroup;
  nickname = '';
  message = '';
  users: Array<{ nickname: string }> = [{ nickname: 'one' }, { nickname: 'two' }, { nickname: 'three' }];
  chats: Array<{
    nickname: string,
    date: Date,
    type: string,
    message: string,
  }> = [{
    nickname: 'one',
    date: new Date(),
    type: 'test',
    message: 'testing 123'
  },
  {
    nickname: 'one',
    date: new Date(),
    type: 'test',
    message: 'testing 123'
  },
  {
    nickname: 'one',
    date: new Date(),
    type: 'test',
    message: 'testing 123'
  },
  {
    nickname: 'two',
    date: new Date(),
    type: 'test',
    message: 'you can stop that now'
  },
  {
    nickname: 'asdf',
    date: new Date(),
    type: 'test',
    message: 'meh'
  }];
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public datepipe: DatePipe) {
    this.nickname = this.route.snapshot.params['nickname'];
  }

  ngOnInit(): void {
    this.chatForm = this.formBuilder.group({
      'message': [null, Validators.required]
    });
  }

  onFormSubmit(form: any) {
    const chat = form;
    chat.nickname = this.nickname;
    chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    chat.type = 'message';
    // const newMessage = firebase.database().ref('chats/').push();
    // newMessage.set(chat);
    this.chatForm = this.formBuilder.group({
      'message': [null, Validators.required]
    });
  }

  exitChat() {

  }

}
