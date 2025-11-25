import {Injectable, signal} from '@angular/core';
import {User} from '../models/user/user';


@Injectable({providedIn: 'root'})
export class UserSessionService {

  private readonly STORAGE_KEY = 'user-session';
  private user = signal<User | null>(this.loadUser());


  setUser(user: User): void {
    this.user.set(user);
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  clearUser(): void {
    this.user.set(null);
    sessionStorage.removeItem(this.STORAGE_KEY);
  }

  getUser(): User | null {
    return this.user();
  }

  private loadUser(): User | null {
    const stored = sessionStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) as User : null;
  }
}
