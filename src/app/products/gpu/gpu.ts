import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../services/product-service';
import {map, switchMap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ProductTypes} from '../../../models/product/ProductTypes';
import {NgOptimizedImage} from '@angular/common';
import {GpuModel} from '../../../models/product/GpuModel';

@Component({
  selector: 'app-gpu',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './gpu.html',
  styleUrl: './gpu.css',
})
export class Gpu implements OnInit {
  private destroyRef = inject(DestroyRef)
  protected gpuProduct = signal<GpuModel | undefined>(undefined)
  constructor(private router: ActivatedRoute, private productService: ProductService) {}

  ngOnInit() {
    this.router.paramMap.pipe(
      map(params => params.get('id')),
      switchMap((id) => {
        return this.productService.getProduct(ProductTypes.GPU, id!)
      }),
      takeUntilDestroyed(this.destroyRef)
    )
      .subscribe(result => {this.gpuProduct.set(result as GpuModel);});
  }
}
