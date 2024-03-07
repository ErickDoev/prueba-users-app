import { Routes } from '@angular/router';

import { EmployeePageComponent } from './features/employees/pages/employee-page/employee-page.component';
import { EmployeeListComponent } from './features/employees/pages/employee-list/employee-list.component';
import { DashboardComponent } from './features/employees/pages/dashboard/dashboard.component';

export const routes: Routes = [
    {
      path: '',
      loadComponent: () => import('./features/employees/layout/employees-layout/employees-layout.component'),
      children: [
        // {
        //   path: '',
        //   // pathMatch:'full',
        //   component: DashboardComponent
        // },
        {
          path: 'add-employee',
          component: EmployeePageComponent
        },
        {
          path: 'employee-list',
          component: EmployeeListComponent
        },
        {
        path: '**',
        redirectTo: 'add-employee'
        }
      ]
    },
    {
        path: '**',
        redirectTo: 'add-employee'
    }
];
