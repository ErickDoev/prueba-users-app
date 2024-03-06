import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmployeePageComponent } from '../../pages/employee-page/employee-page.component';
import { SidebarComponent } from '../../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-employees-layout',
  standalone: true,
  imports: [
    CommonModule,
    EmployeePageComponent,
    SidebarComponent
  ],
  templateUrl: './employees-layout.component.html',
  styleUrl: './employees-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class EmployeesLayoutComponent { }

export default EmployeesLayoutComponent;
