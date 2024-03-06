import { Routes } from '@angular/router';

import { EmployeePageComponent } from './features/employees/pages/employee-page/employee-page.component';
import { EmployeeListComponent } from './features/employees/pages/employee-list/employee-list.component';

export const routes: Routes = [
    {
      path: '',
      loadComponent: () => import('./features/employees/layout/employees-layout/employees-layout.component'),
      children: [
        {
          path: 'add-employee',
          component: EmployeePageComponent
        },
        {
          path: 'employee-list',
          component: EmployeeListComponent
        },
      ]
    },
    {
        path: '**',
        redirectTo: 'add-employee'
    }
];
