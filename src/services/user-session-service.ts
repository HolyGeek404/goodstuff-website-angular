import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {User} from '../models/user/user';
import {catchError, map, Observable, of, tap} from 'rxjs';


@Injectable({providedIn: 'root'})
export class UserSessionService {
  constructor(private http: HttpClient) {
  }

  public signIn(email: string, password: string): Observable<any> {
    return  this.http.post<any>(`${environment.api_gateway_url}/user/signin`, {email, password}, {withCredentials: true});
  }

  public checkSession(): Observable<boolean> {
    const data = this.getUserDataFromLocalStorage();
    if (data) {
      return of(true);
    }
    return this.http.get<User>(`${environment.api_gateway_url}/user/me`, {withCredentials: true}).pipe(
      tap((user) => {
        console.log(user);

        if (user) {
          this.addUserDataToLocalStorage(user.name, user.surname, user.email);
        }
      }),
      map((user) => !!user),
      catchError(() => of(false))
    );
  }

  public getUserDataFromLocalStorage<User>(): User | null {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }

  private addUserDataToLocalStorage(name: string, surname: string, email: string) {
    localStorage.setItem("user", JSON.stringify({ name, surname, email }));
  }
}
