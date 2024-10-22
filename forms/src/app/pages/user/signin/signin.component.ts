import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  constructor(private userSvc: UserService, private router: Router) {}
  @ViewChild('form') form!: NgForm;
  checkData!: boolean;

  signIn(form: NgForm) {
    this.checkData = this.userSvc.login(form.form.value);
    if (this.checkData) {
      form.reset();
      this.router.navigate(['/']);
      this.userSvc.isLoggedIn$.next(true);
    } else {
      alert('Wrong email or password');
    }
  }
}
