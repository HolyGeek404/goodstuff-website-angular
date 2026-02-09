import { Component, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { GoodStuffFunctionsService } from '../../../services/GoodStuffFunctionsService';
import { ActivatedRoute } from '@angular/router';
import { ProductTypes } from '../../../models/product/ProductTypes';
import {BaseProduct} from '../../../models/product/BaseProduct';
import {ProductCardDetails} from '../details/product-card-details/product-card-details.component';
import {ProductFilterComponent, type ProductFilterSelection} from '../filter/product-filter.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgOptimizedImage, ProductCardDetails, ProductFilterComponent],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCard {
  private functionsService = inject(GoodStuffFunctionsService);

  products = signal<BaseProduct[]>([]);
  allProducts = signal<BaseProduct[]>([]);
  category = signal<ProductTypes>(ProductTypes.CPU);

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(p => {
      const cat = p.get('category') as keyof typeof ProductTypes;
      const productCategory = ProductTypes[cat];
      this.category.set(productCategory);
      // Fetch products whenever product-card changes
      this.functionsService.getProducts(productCategory).subscribe({
        next: (data) => {
          this.allProducts.set(data);
          this.products.set(data);
        },
        error: (err) => console.error(`Error loading products for ${productCategory}:`, err)
      });
    });
  }

  onFiltersApplied(selection: ProductFilterSelection): void {
    const minPrice = this.parseNumber(selection.priceMin);
    const maxPrice = this.parseNumber(selection.priceMax);
    const filtered = this.allProducts().filter((product) => {
      const data = product as BaseProduct & {
        socket?: string;
        cores?: string;
        architecture?: string;
      };
      if (selection.team.length && !selection.team.includes(data.team)) {
        return false;
      }
      if (selection.socket.length && !selection.socket.includes(data.socket ?? '')) {
        return false;
      }
      if (selection.cores.length && !selection.cores.includes(data.cores ?? '')) {
        return false;
      }
      if (selection.architecture.length && !selection.architecture.includes(data.architecture ?? '')) {
        return false;
      }
      if (minPrice !== null || maxPrice !== null) {
        const priceValue = this.parseNumber(product.price);
        if (priceValue === null) {
          return false;
        }
        if (minPrice !== null && priceValue < minPrice) {
          return false;
        }
        if (maxPrice !== null && priceValue > maxPrice) {
          return false;
        }
      }
      return true;
    });
    this.products.set(filtered);
  }

  private parseNumber(value: string): number | null {
    const normalized = value.replace(',', '.').replace(/[^0-9.]/g, '');
    if (!normalized) {
      return null;
    }
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : null;
  }
}
