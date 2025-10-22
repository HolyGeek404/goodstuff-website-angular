import { Component } from '@angular/core';
import {Navmenu} from '../navmenu/navmenu';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [
    Navmenu,
    NgOptimizedImage
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {

}
