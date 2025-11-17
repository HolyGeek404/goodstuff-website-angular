import { Component } from '@angular/core';
import {CategoryCard} from '../categories/category-card/category-card';
import {ProductTypes} from '../../models/product/ProductTypes';
import {Nav} from '../nav/nav';

@Component({
  selector: 'app-home',
  imports: [
    CategoryCard,
    Nav
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  categories = Object.values(ProductTypes);
}
