import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Catalog } from '../interfaces/catalogs.interface';
import { Employee } from '../interfaces/employee.interface';
import { v4 as uuid } from 'uuid';

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

const EMPLOYEES: Employee[] = [
  {
    id: uuid(),
    nombre: 'Erick Cruz Padilla',
    fechaNacimiento: new Date().getTime(),
    edad: 26,
    estatus: true,
    idCargo: 1
  },
  {
    id: uuid(),
    nombre: 'Paloma Cruz Padilla',
    fechaNacimiento: new Date().getTime(),
    edad: 22,
    estatus: true,
    idCargo: 1
  },
  {
    id: uuid(),
    nombre: 'Yeray Cruz Padilla',
    fechaNacimiento: new Date().getTime(),
    edad: 18,
    estatus: true,
    idCargo: 2
  },
];

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor() { }

  private employees: Employee[] = EMPLOYEES;

  getCatalogs(): Observable<Catalog[]>{
    return of(CATALOGS);
  }

  addEmployee(employe: Employee):Observable<boolean>{
    console.log({employe});
    const employeeWithId = {
      ...employe,
      id: uuid()
    }
    this.employees.push(employeeWithId);
    return of(true);
  }

  getEmmployees(){
    return of(this.employees);
  }

}
