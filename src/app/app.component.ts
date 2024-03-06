import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Employee } from './interfaces/employee.interface';
import { EmployeesService } from './services/employees.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'prueba-users-app';
  employeeService = inject(EmployeesService);

  constructor(){
    this.employeeService.loadEmployees();
  }
}
