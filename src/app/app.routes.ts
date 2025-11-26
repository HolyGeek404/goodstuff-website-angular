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
    path: 'user/sign-in',
    loadComponent: () =>
      import('./user/sign-in/sign-in').then(m => m.SignIn)
  },
  {
    path: 'user/dashboard',
    loadComponent: () =>
      import('./user/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'user/sign-up',
    loadComponent: () =>
      import('./user/sign-up/sign-up').then(m => m.SignUp)
  }
];

