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
  panels = ['Overview', 'Orders', 'Settings', 'Security', 'Support'];
  activePanel = 'Overview';

  constructor() {
    this.user = this.userSession.getUser();
  }

  selectPanel(panel: string): void {
    this.activePanel = panel;
  }

  signOut(): void {
    this.userSession.signOut();
  }
}
