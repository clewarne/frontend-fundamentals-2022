import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chat } from 'src/app/models/chat';
import { User } from 'src/app/models/user';
import { FirebaseService } from 'src/app/services/firebase.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.less']
})
export class ChatroomComponent implements OnInit, OnDestroy {
  @ViewChild('chatcontent') chatcontent!: ElementRef;
  scrolltop: number = 0;

  chatForm: FormGroup;
  nickname = '';
  message = '';
  
  chats$ = this.firebaseService.chats$;

  matcher = new MyErrorStateMatcher();

  private subscriptions = new Subscription();

  constructor(private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public datepipe: DatePipe,
    private ref: ChangeDetectorRef,
    private firebaseService: FirebaseService) {
    this.route.params.subscribe(params => {
      this.nickname = params['nickname'];
    });

    this.chatForm = this.formBuilder.group({
      'message': [null, Validators.required]
    });

  }

  ngOnInit(): void {

  }

  async onFormSubmit(chat: Chat) {
    chat.nickname = this.nickname;
    chat.date = new Date();
    chat.type = 'message';
    await this.firebaseService.sendChat(chat);
    this.chatForm = this.formBuilder.group({
      'message': [null, Validators.required]
    });
    this.ref.detectChanges();
  }

  async exitChat() {
    await this.firebaseService.logout(this.nickname);
    this.router.navigate(['login']);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
