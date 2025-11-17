import {Component, inject, signal} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {GoodStuffFunctionsService} from '../../../services/GoodStuffFunctionsService';
import {Cpu} from '../../../models/product/Cpu';
import {ActivatedRoute} from '@angular/router';

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
  // cpus = signal<Cpu[]>([]);
  //
  // constructor() {
  //   this.cpuService.getCpus().subscribe({
  //     next: (data) => this.cpus.set(data),
  //     error: (err) => console.error('Error loading CPUs:', err),
  //   });
  // }

  category = signal('');

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(p => {
      this.category.set(p.get('category')!);
    });
  }
}
