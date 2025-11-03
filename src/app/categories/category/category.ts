import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-category',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class Category {
  constructor(private route: ActivatedRoute) {
  }

}
