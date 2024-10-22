import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private userSvc: UserService,
    private router: Router
  ) {}

  form!: FormGroup;

  genres: string[] = ['Male', 'Female', 'Other'];

  ngOnInit() {
    this.form = this.fb.group({
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      profileImg: this.fb.control('', [Validators.required]),
      genre: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required]),
      username: this.fb.control('', [Validators.required]),
      authData: this.fb.group({
        email: this.fb.control('', [Validators.email, Validators.required]),
        password: this.fb.control('', [Validators.required]),
        confirmPassword: this.fb.control('', [Validators.required]),
      }),
    });
  }

  signUp() {
    if (this.form.valid) {
      this.userSvc.addUser(this.form.value).subscribe();
      this.form.reset();
      this.router.navigate(['/']);
    }
  }
}
