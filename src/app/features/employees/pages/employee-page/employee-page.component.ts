import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmployeeFormComponent } from '../../components/employee-form/employee-form.component';

@Component({
  selector: 'app-employee-page',
  standalone: true,
  imports: [
    CommonModule,
    EmployeeFormComponent
  ],
  templateUrl: './employee-page.component.html',
  styleUrl: './employee-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeePageComponent { }
