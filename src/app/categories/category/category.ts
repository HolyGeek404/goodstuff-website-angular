import { Component, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { GoodStuffFunctionsService } from '../../../services/GoodStuffFunctionsService';
import { ActivatedRoute } from '@angular/router';
import { ProductTypes } from '../../../models/product/ProductTypes';
import {BaseProduct} from '../../../models/product/BaseProduct';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './category.html',
  styleUrls: ['./category.css']
})
export class Category {
  private functionsService = inject(GoodStuffFunctionsService);

  products = signal<BaseProduct[]>([]);
  category = signal<ProductTypes>(ProductTypes.CPU);

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(p => {
      const cat = p.get('category') as keyof typeof ProductTypes;
      const productCategory = ProductTypes[cat];
      this.category.set(productCategory);

      // Fetch products whenever category changes
      this.functionsService.getProducts(productCategory).subscribe({
        next: (data) => this.products.set(data),
        error: (err) => console.error(`Error loading products for ${productCategory}:`, err)
      });
    });
  }
}
