import {Component, computed, inject} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {UserSessionService} from '../../services/UserSessionService';

@Component({
  selector: 'app-nav',
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  private userSession = inject(UserSessionService);
  isSignedIn = computed(() => !!this.userSession.getUser());
}
