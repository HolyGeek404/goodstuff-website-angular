import {Component, inject} from '@angular/core';
import {UserSessionService} from '../../../services/UserSessionService';
import {User} from '../../../models/user/user';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  private userSession = inject(UserSessionService)
  user: User | null = null;

  constructor() {
    this.user = this.userSession.getUser();
  }
}
