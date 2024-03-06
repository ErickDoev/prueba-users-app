import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidebarComponent } from '../../../../shared/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-employees-layout',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    RouterOutlet
  ],
  templateUrl: './employees-layout.component.html',
  styleUrl: './employees-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class EmployeesLayoutComponent { }

export default EmployeesLayoutComponent;
