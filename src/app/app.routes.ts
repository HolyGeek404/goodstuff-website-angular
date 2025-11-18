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
      import('./categories/category/category').then(m => m.Category)
  },
  {
    path: 'user/sign-in',
    loadComponent: () =>
      import('./user/sign-in/sign-in').then(m => m.SignIn)
  }
];

