import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../services/product-service';
import {map, switchMap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {CpuModel} from '../../../models/product/CpuModel';
import {ProductTypes} from '../../../models/product/ProductTypes';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-cpu',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './cpu.html',
  styleUrl: './cpu.css',
})
export class Cpu implements OnInit {
  private destroyRef = inject(DestroyRef)
  protected cpuProduct = signal<CpuModel | undefined>(undefined)
  constructor(private router: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(){
    this.router.paramMap.pipe(
      map(params => params.get('id')),
      switchMap((id) => {
        return this.productService.getProduct(ProductTypes.CPU,id!)
      }),
      takeUntilDestroyed(this.destroyRef)
    )
      .subscribe(result => {this.cpuProduct.set(result as CpuModel);});
  }
}
