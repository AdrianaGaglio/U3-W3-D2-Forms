import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iUser } from '../models/iuser';
import { filter, map, Observable, Subject, tap } from 'rxjs';
import { iAuth } from '../models/iauth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {
    this.getUsers().subscribe((res) => (this.users = res));
  }

  apiUrl = 'http://localhost:3000/users';
  users: iUser[] = [];
  isLoggedIn$ = new Subject<boolean>();

  addUser(user: Partial<iUser>): Observable<iUser> {
    return this.http.post<iUser>(this.apiUrl, user);
  }

  getUsers() {
    return this.http.get<iUser[]>(this.apiUrl);
  }

  login(auth: Partial<iAuth>): boolean {
    let found = this.users.find(
      (user) =>
        user.authData.email === auth.email &&
        user.authData.password === auth.password
    );
    if (found) return true;
    return false;
  }
}
