import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ProductService} from '../../../services/product-service';
import {BaseProduct} from '../../../models/product/BaseProduct';
import {CpuSpecDetails} from '../details/cpu-spec-details/cpu-spec-details';
import {GpuSpecDetails} from '../details/gpu-spec-details/gpu-spec-details';
import {CoolerSpecDetails} from '../details/cooler-spec-details/cooler-spec-details';
import {ProductTypes} from '../../../models/product/ProductTypes';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, CpuSpecDetails, GpuSpecDetails, CoolerSpecDetails],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCard {
  category!: string;
  products = signal<BaseProduct[]>([]);

    constructor(private router: ActivatedRoute, private productService: ProductService) {}

    ngOnInit() {
      this.category = this.router.snapshot.params['category'];
      this.productService.getProductBaseInfo(this.category).subscribe({
      next: data => this.products.set(data)
    })
  }

  protected readonly ProductTypes = ProductTypes;
}
