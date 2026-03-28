import {Component, OnInit, signal} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {UserSessionService} from '../../services/user-session-service';

@Component({
  selector: 'app-nav',
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav implements OnInit {
  isLoggedIn = signal<boolean>(false);

  constructor(private userSessionService: UserSessionService) {
  }

  ngOnInit() {
    const result = this.userSessionService.checkSession().subscribe(session => {
      this.isLoggedIn.set(session);
    });
  }
}
