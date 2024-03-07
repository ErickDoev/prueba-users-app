import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Catalog } from '../interfaces/catalogs.interface';
import { Employee } from '../interfaces/employee.interface';
import { v4 as uuid } from 'uuid';
import { EmployeesResponse } from '../interfaces/employees-response.interface';

const CATALOGS: Catalog[] = [
  {
    id: 1,
    descripcion: 'Gerente'
  },
  {
    id: 2,
    descripcion: 'Coordinador'
  },
  {
    id: 3,
    descripcion: 'Subdirector'
  }
];

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor() { }

  private employees: Employee[] = [];

  loadEmployees(){
    this.employees = JSON.parse(localStorage.getItem('employess') || '[]');
  }

  getCatalogs(): Observable<Catalog[]>{
    return of(CATALOGS);
  }

  addEmployee(employe: Employee):Observable<boolean>{
    const employeeWithId = {
      ...employe,
      id: uuid()
    }
    this.employees.push(employeeWithId);
    localStorage.setItem('employess', JSON.stringify(this.getAllEmmployees()));
    return of(true);
  }

  deleteEmployee(id: string): Observable<Employee[]>{
    const newEmps = this.employees.filter(emp => emp.id !== id);
    this.employees = newEmps;
    localStorage.setItem('employess', JSON.stringify(this.getAllEmmployees()));
    return of(newEmps);
  }

  updateEmployee(employee: any){
    const newEmps = this.employees.map((emp) => {
      if(emp.id === employee.id){
        return {
          ...emp,
          ...employee
        }
      } else {
        return emp;
      }
    });
    this.employees = newEmps;
    localStorage.setItem('employess', JSON.stringify(this.getAllEmmployees()));
    return of(newEmps);
  }

  getAllEmmployees(){
    return this.employees;
  }

  getPaginatedEmployes(inicio: number, fin: number){
    const employess = this.getAllEmmployees().slice(inicio, fin);
    return employess;
  }

  getEmployeesListResponse(size: number, currentPage: number): Observable<EmployeesResponse>{
    const offset = (currentPage - 1 ) * size;
    const limit = currentPage*size;
    const paginatedEmployess = this.getPaginatedEmployes(offset, limit);
    const numberOfEmployess = paginatedEmployess.length;

    const resp: EmployeesResponse = {
      content: paginatedEmployess,
      pageable: {
        sort: {
          empty: false,
          sorted: true,
          unsorted: false,
        },
        offset: (currentPage - 1 ) * size,
        pageNumber: currentPage,
        pageSize: size,
        paged: true,
        unpaged: false,
      },
      totalPages: Math.ceil(this.getAllEmmployees().length / size),
      totalElements: this.getAllEmmployees().length,
      last: true,
      number: 0,
      sort: {
        empty: false,
        sorted: true,
        unsorted: false,
      },
      size: size,
      numberOfElements: numberOfEmployess,
      first: true,
      empty: false
    }

    return of(resp);
  }

}
