import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../services/product-service';
import {map, switchMap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {CpuModel} from '../../../models/product/CpuModel';

@Component({
  selector: 'app-cpu',
  imports: [],
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
        return this.productService.getProductBaseInfo(id)
      }),
      takeUntilDestroyed(this.destroyRef)
    )
      .subscribe(result => {this.products.set(result);});
  }
}
