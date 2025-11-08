import {Component, inject, signal} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {GoodStuffFunctionsService} from '../../../services/GoodStuffFunctionsService';
import {CpuProduct} from '../../../models/product/CpuModel';

@Component({
  selector: 'app-category',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class Category {
  private cpuService = inject(GoodStuffFunctionsService);
  cpus = signal<CpuProduct[]>([]);

  constructor() {
    this.cpuService.getCpus().subscribe({
      next: (data) => this.cpus.set(data),
      error: (err) => console.error('Error loading CPUs:', err),
    });
  }

}
