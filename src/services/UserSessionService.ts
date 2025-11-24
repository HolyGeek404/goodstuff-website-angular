import {Injectable, signal} from '@angular/core';
import {User} from '../models/user/user';


@Injectable({providedIn: 'root'})
export class UserSessionService {

  private user = signal<User | null>(null)

  setUser(user: User): void {
    this.user.set(user);
  }

  clearUser(): void {
    this.user.set(null);
  }

  getUser(): User | null {
    return this.user();
  }
}
