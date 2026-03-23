import {Component, inject, input, signal} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import {ProductService} from '../../../services/product-service';
import {BaseProduct} from '../../../models/product/BaseProduct';
import {ProductTypes} from '../../../models/product/ProductTypes';
import {CpuSpecDetails} from '../details/cpu-spec-details/cpu-spec-details';
import {GpuSpecDetails} from '../details/gpu-spec-details/gpu-spec-details';
import {CoolerSpecDetails} from '../details/cooler-spec-details/cooler-spec-details';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, CpuSpecDetails, GpuSpecDetails, CoolerSpecDetails],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCard {
  private productService = inject(ProductService);
  category = input.required<string>()
  products = signal<BaseProduct[]>([]);

    ngOnInit() {
    this.productService.getProductBaseInfo(this.category()).subscribe({
      next: data => this.products.set(data)
    })
  }


  protected readonly ProductTypes = ProductTypes;
}
