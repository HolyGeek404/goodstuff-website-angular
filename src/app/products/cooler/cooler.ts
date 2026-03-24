import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../services/product-service';
import {map, switchMap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {CoolerModel} from '../../../models/product/CoolerModel';
import {ProductTypes} from '../../../models/product/ProductTypes';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-cooler',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './cooler.html',
  styleUrl: './cooler.css',
})
export class Cooler implements OnInit {
  private destroyRef = inject(DestroyRef)
  protected coolerProduct = signal<CoolerModel | undefined>(undefined)
  constructor(private router: ActivatedRoute, private productService: ProductService) {}

  ngOnInit() {
    this.router.paramMap.pipe(
      map(params => params.get('id')),
      switchMap((id) => {
        return this.productService.getProduct(ProductTypes.COOLER, id!)
      }),
      takeUntilDestroyed(this.destroyRef)
    )
      .subscribe(result => {this.coolerProduct.set(result as CoolerModel);});
  }
}
