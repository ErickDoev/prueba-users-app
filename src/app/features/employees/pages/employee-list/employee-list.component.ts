import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { EmployeesService } from '../../../../services/employees.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent implements OnInit {
  private readonly employeeService = inject(EmployeesService);

  ngOnInit(): void {
    console.log(this.employeeService.getEmmployees());

  }
}

// export default EmployeeListComponent;
