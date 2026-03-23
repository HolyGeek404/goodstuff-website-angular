import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home').then(m => m.Home)
  },
  {
    path: 'products/:category',
    loadComponent: () =>
      import('./products/product-card/product-card').then(m => m.ProductCard)
  },
  {
    path: 'products/CPU/:id',
    loadComponent: () =>
      import('./products/cpu/cpu').then(m => m.Cpu)
  }
];
