import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'users',
        loadComponent: () => import('./features/employees/layout/employees-layout/employees-layout.component')
    },
    {
        path: '**',
        redirectTo: 'users'
    }
];
