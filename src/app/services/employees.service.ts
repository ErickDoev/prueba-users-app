import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Catalog } from '../interfaces/catalogs.interface';

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

  getCatalogs(): Observable<Catalog[]>{
    return of(CATALOGS);
  }

}
