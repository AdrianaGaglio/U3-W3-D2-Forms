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
      profileImg: this.fb.control(''),
      genre: this.fb.control('', [Validators.required]),
      description: this.fb.control(''),
      username: this.fb.control('', [Validators.required]),
      authData: this.fb.group({
        email: this.fb.control('aaa', [Validators.email, Validators.required]),
        password: this.fb.control('', [
          Validators.required,
          this.checkPasswords,
        ]),
        confirmPassword: this.fb.control('', [Validators.required]),
      }),
    });
  }

  ngAfterViewInit() {
    // add error message to firstname field
    this.form.get('firstName')?.setErrors({
      required: true,
      message: 'You must insert a valid name',
    });
    // add error message to lastname field
    this.form.get('lastName')?.setErrors({
      required: true,
      message: 'You must insert a valid surname',
    });
    // add error message to select genre
    this.form
      .get('genre')
      ?.setErrors({ required: true, message: 'You must select a genre' });
    // add error message to username
    this.form.get('username')?.setErrors({
      required: true,
      message: 'You must insert a valid username',
    });
  }

  checkPasswords = (): ValidationErrors | null => {
    if (this.form) {
      if (
        this.form.get('authData.password')?.value ===
        this.form.get('authData.confirmPassword')?.value
      ) {
        return null;
      } else {
        return {
          mismatch: true,
          message: 'Passwords do not match',
        };
      }
    }
    return null;
  };

  signUp() {
    if (this.form.valid) {
      this.userSvc.addUser(this.form.value).subscribe();
      this.form.reset();
      this.userSvc.isLoggedIn = true;
      this.router.navigate(['/user']);
    }
  }
}
