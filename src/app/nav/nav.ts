import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';

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

}
