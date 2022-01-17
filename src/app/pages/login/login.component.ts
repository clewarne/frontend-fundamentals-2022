import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { } from 'firebase/database'
import { User } from 'src/app/models/user';
import { FirebaseService } from 'src/app/services/firebase.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  nickname = '';
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private formBuilder: FormBuilder, private firebaseService: FirebaseService) {
    this.loginForm = this.formBuilder.group({
      'nickname': [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  async onFormSubmit(user: User) {
    await this.firebaseService.login(user.nickname);
    this.router.navigate([`chatroom/${user.nickname}`]);
  }

}
