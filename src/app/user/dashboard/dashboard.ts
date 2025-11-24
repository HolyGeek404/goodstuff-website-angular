import {Component, inject} from '@angular/core';
import {UserSessionService} from '../../../services/UserSessionService';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  private userSession = inject(UserSessionService)
  user = this.userSession.getUser();

}
