import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { EmployeesService } from '../../../../services/employees.service';
import { TitleComponent } from '../../../../shared/title/title.component';
import { WhiteCardComponent } from '../../../../shared/white-card/white-card.component';
import { Employee } from '../../../../interfaces/employee.interface';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    WhiteCardComponent,
    MatPaginatorModule,
    MatTableModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent {

  private fb = inject(FormBuilder);
  form!: FormGroup;
  searchTerm!: FormControl;

  private readonly employeeService = inject(EmployeesService);
  employess: Employee[] = [];

  currentPage: number = 1;
  pageSize: number = 5;

  totalRecords: number = 0;
  totalPages: number = 0;

  displayedColumns: string[] = ['id', 'nombre', 'edad' , 'actions'];

  constructor(){
    this.getEmployeesListResponse(this.pageSize, this.currentPage);
    this.initForm();
    // this.searchTerm = this.fb.control('');
  }

  initForm(){
    this.form = this.fb.group({
      employees: this.fb.array(this.employess.map(emp => this.createEmployeesGroup(emp)))
    });
  }

  createEmployeesGroup(emp: Employee): FormGroup{
    return this.fb.group({
      nombre: [emp.nombre],
      edad: [emp.edad],
      estatus: [emp.estatus],
      isEdit: [false],
      id: [emp.id]
    });
  }

  get employeesArr(){
    return this.form.get('employees') as FormArray;
  }

  handlePageEvent(event: PageEvent){
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getEmployeesListResponse(this.pageSize, this.currentPage);
  }

  getEmployeesListResponse(pageSize: number, currentPage: number){
    this.employeeService.getEmployeesListResponse(pageSize, currentPage).subscribe(emps => {
      this.employess = emps.content;
      this.initForm();
      this.totalRecords = emps.totalElements;
      this.totalPages = emps.totalPages;
    });
  }

  onDeleteField(index: any){
    const control = this.employeesArr.controls[index];
    console.log(control.value.id);
    this.employeeService.deleteEmployee(control.value.id).subscribe(res => {
      console.log(res);
      this.employess = res;
      this.initForm();
    })
  }

  onEditField(index: number){
    const controls = this.employeesArr.controls[index];
    controls.get('isEdit')?.patchValue(true);
  }

  editEmployee(emp: any){
    const employee = emp.value;
    const payload = {
      nombre: employee.nombre,
      edad: Number(employee.edad),
      estatus: employee.estatus,
      id: employee.id
    }

    Swal.fire({
      icon: "question",
      title: "Desea registrar al empleado?",
      confirmButtonText: 'Si, guardar',
      showDenyButton: true,
      denyButtonText: `Cancelar`
    }).then((result) => {
      if(result.isConfirmed){
        emp.get('isEdit').patchValue(false)
        this.employeeService.updateEmployee(payload).subscribe(resp => {
          if(resp){
            console.log('sup ');
            this.openSuccessDialog();

          }
        });
      }
    })

  }

  openSuccessDialog(){
    Swal.fire({
      icon: "success",
      title: "El empleado ha sido actualizado!",
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
    })
  }
}
