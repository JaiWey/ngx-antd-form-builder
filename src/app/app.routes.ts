import { Routes } from '@angular/router';
import { FormBuilderComponent } from './form-bulider.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./form-bulider.component').then(mod => mod.FormBuilderComponent),
  }
];
