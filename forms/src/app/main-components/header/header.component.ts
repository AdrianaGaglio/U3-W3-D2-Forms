import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private userSvc: UserService, private router: Router) {}

  isLoggedIn!: boolean;

  ngDoCheck() {
    this.isLoggedIn = this.userSvc.isLoggedIn;
  }

  logout() {
    this.userSvc.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
