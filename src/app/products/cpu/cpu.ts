import {Component, DestroyRef, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../services/product-service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {CpuModel} from '../../../models/product/CpuModel';
import {ProductTypes} from '../../../models/product/ProductTypes';
import {NgOptimizedImage} from '@angular/common';
import {loadProduct} from '../../../services/product-helper';

@Component({
  selector: 'app-cpu',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './cpu.html',
  styleUrl: './cpu.css',
})
export class Cpu implements OnInit {
  protected cpuProduct = signal<CpuModel | undefined>(undefined)

  constructor(
    private router: ActivatedRoute,
    private productService: ProductService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    loadProduct<CpuModel>(ProductTypes.CPU, this.productService, this.router)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(product => this.cpuProduct.set(product));
  }
}
