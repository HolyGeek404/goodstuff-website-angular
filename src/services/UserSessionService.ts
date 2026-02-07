import {inject, Injectable, signal} from '@angular/core';
import {User} from '../models/user/user';
import {GoodStuffFunctionsService} from './GoodStuffFunctionsService';
import {Router} from '@angular/router';


@Injectable({providedIn: 'root'})
export class UserSessionService {
  private functionsService = inject(GoodStuffFunctionsService);
  private readonly STORAGE_KEY = 'user-session';
  private user = signal<User | null>(this.loadUser());

  constructor(private router: Router) {}

  setUser(user: User): void {
    this.user.set(user);
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  signOut(): void {
    this.functionsService.signOut().subscribe({
      next: () => {
        this.user.set(null);
        sessionStorage.removeItem(this.STORAGE_KEY);
        this.router.navigate(['/']);
      },
      error: (err) => console.error(`Error signing out.`, err)
    });
  }

  getUser(): User | null {
    return this.user();
  }

  private loadUser(): User | null {
    const stored = sessionStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) as User : null;
  }
}
