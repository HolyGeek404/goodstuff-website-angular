import { Component } from '@angular/core';
import {CategoryCard} from '../categories/category-card/category-card';
import {Category} from '../categories/category/category';

@Component({
  selector: 'app-home',
  imports: [
    CategoryCard,
    Category
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  categories = ["CPU","GPU","RAM","MOBO","PSU","SSD","CASE","COOLER"];
}
