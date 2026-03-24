import { Routes } from '@angular/router';
import {ProductTypes} from '../models/product/ProductTypes';

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
    path: `products/${ProductTypes.CPU}/:id`,
    loadComponent: () =>
      import('./products/cpu/cpu').then(m => m.Cpu)
  },
  {
    path: `products/${ProductTypes.GPU}/:id`,
    loadComponent: () =>
      import('./products/gpu/gpu').then(m => m.Gpu)
  },
  {
    path: 'products/COOLER/:id',
    loadComponent: () =>
      import('./products/cooler/cooler').then(m => m.Cooler)
  }
];
