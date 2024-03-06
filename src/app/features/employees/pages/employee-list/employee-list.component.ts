import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { EmployeesService } from '../../../../services/employees.service';
import { TitleComponent } from '../../../../shared/title/title.component';
import { WhiteCardComponent } from '../../../../shared/white-card/white-card.component';
import { Employee } from '../../../../interfaces/employee.interface';
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    WhiteCardComponent,
    MatPaginatorModule
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent implements OnInit {
  private readonly employeeService = inject(EmployeesService);
  employess: Employee[] = [];

  currentPage: number = 1;
  pageSize: number = 5;

  totalRecords: number = 0;
  totalPages: number = 0;

  ngOnInit(): void {
    this.getEmployeeList(this.pageSize, this.currentPage);
  }

  handlePageEvent(event: PageEvent){
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getEmployeeList(this.pageSize, this.currentPage);
  }

  getEmployeeList(pageSize: number, currentPage: number){
    this.employeeService.getEmployeesListResponse(pageSize, currentPage).subscribe(emps => {
      this.employess = emps.content;
      this.totalRecords = emps.totalElements;
      this.totalPages = emps.totalPages;
    });
  }
}
