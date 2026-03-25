import {Component, DestroyRef, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../services/product-service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ProductTypes} from '../../../models/product/ProductTypes';
import {NgOptimizedImage} from '@angular/common';
import {GpuModel} from '../../../models/product/GpuModel';
import {loadProduct} from '../../../services/product-helper';

@Component({
  selector: 'app-gpu',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './gpu.html',
  styleUrl: './gpu.css',
})
export class Gpu implements OnInit {
  protected gpuProduct = signal<GpuModel | undefined>(undefined)

  constructor(
    private router: ActivatedRoute,
    private productService: ProductService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    loadProduct<GpuModel>(ProductTypes.GPU, this.productService, this.router)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(product => this.gpuProduct.set(product));
  }
}
