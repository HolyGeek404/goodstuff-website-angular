import {Component, DestroyRef, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../services/product-service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {CoolerModel} from '../../../models/product/CoolerModel';
import {ProductTypes} from '../../../models/product/ProductTypes';
import {NgOptimizedImage} from '@angular/common';
import {loadProduct} from '../../../services/product-helper';

@Component({
  selector: 'app-cooler',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './cooler.html',
  styleUrl: './cooler.css',
})
export class Cooler implements OnInit {
  protected coolerProduct = signal<CoolerModel | undefined>(undefined)

  constructor(
    private router: ActivatedRoute,
    private productService: ProductService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    loadProduct<CoolerModel>(ProductTypes.COOLER, this.productService, this.router)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(product => this.coolerProduct.set(product));
  }
}
