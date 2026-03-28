import {Component, signal} from '@angular/core';
import {UserSessionService} from '../../../services/user-session-service';
import {User} from '../../../models/user/user';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  user = signal<User|null>(null)
  panels = ['Overview', 'Orders', 'Settings', 'Security', 'Support'];
  activePanel = 'Overview';

  constructor(userSessionService: UserSessionService) {
    this.user.set(userSessionService.getUserDataFromLocalStorage())
  }

  selectPanel(panel: string): void {
    this.activePanel = panel;
  }

  signOut(): void {

  }
}
