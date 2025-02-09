import { Routes } from '@angular/router';
import { validateProductIdGuard } from './products/guards/validate-product-id.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent),
  },
  {
    path: 'dashboard',
    redirectTo: '',
  },
  {
    path: 'products/:id',
    canActivate: [validateProductIdGuard],
    loadComponent: () => import('./products/product-detail/product-detail.component').then(c => c.ProductDetailComponent),
  },
];
