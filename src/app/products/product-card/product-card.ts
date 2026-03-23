import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ProductService} from '../../../services/product-service';
import {BaseProduct} from '../../../models/product/BaseProduct';
import {CpuSpecDetails} from '../details/cpu-spec-details/cpu-spec-details';
import {GpuSpecDetails} from '../details/gpu-spec-details/gpu-spec-details';
import {CoolerSpecDetails} from '../details/cooler-spec-details/cooler-spec-details';
import {ProductTypes} from '../../../models/product/ProductTypes';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {map, switchMap} from 'rxjs';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, CpuSpecDetails, GpuSpecDetails, CoolerSpecDetails],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCard implements OnInit{
  private destroyRef = inject(DestroyRef)
  category = signal<string>("")
  products = signal<BaseProduct[]>([]);

    constructor(private router: ActivatedRoute, private productService: ProductService) {}

    ngOnInit() {
      this.router.paramMap.pipe(
        map(params => {this.category.set(params.get('category') as string)}),
        switchMap(() => {
          return this.productService.getProductBaseInfo(this.category())
        }),
        takeUntilDestroyed(this.destroyRef)
      )
        .subscribe(result => {this.products.set(result);});
    }

  protected readonly ProductTypes = ProductTypes;
}
