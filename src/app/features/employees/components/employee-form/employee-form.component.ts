import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { EmployeesService } from '../../../../services/employees.service';
import { Catalog } from '../../../../interfaces/catalogs.interface';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { Employee } from '../../../../interfaces/employee.interface';
import { MatNativeDateModule } from '@angular/material/core';
import { WhiteCardComponent } from '../../../../shared/white-card/white-card.component';
import { ErrorMsgComponent } from '../../../../shared/error-msg/error-msg.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    WhiteCardComponent,
    ErrorMsgComponent
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeFormComponent implements OnInit {
  fb = inject(FormBuilder);
  form :FormGroup;

  employeeService = inject(EmployeesService);
  catalogs: Catalog[] = [];
  maxDate: Date = new Date();

  constructor(){
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      secondlastName: ['', [Validators.required]],
      birthDay: ['', [Validators.required]],
      age: [0, [Validators.required, Validators.min(1)]],
      charge: ['', [Validators.required]],
      isActive: [true, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.employeeService.getCatalogs().subscribe(catalogs => {
      this.catalogs = catalogs;
    })
  }

  onSubmit(){
    const birthDay = this.form.get('birthDay')?.value;

    if(this.form.invalid) return;
    const payload: Employee = {
      nombre: this.getFullName(),
      fechaNacimiento: new Date(birthDay).getTime(),
      edad: this.form.get('age')?.value,
      idCargo: this.form.get('charge')?.value,
      estatus: this.form.get('isActive')?.value,
    }
    Swal.fire({
      icon: "question",
      title: "Desea registrar al empleado?",
      confirmButtonText: 'Si, guardar',
      showDenyButton: true,
      denyButtonText: `Cancelar`
    }).then((result) => {
      if(result.isConfirmed){
        this.employeeService.addEmployee(payload).subscribe(resp => {
          if(resp){
            this.openSuccessDialog();
          }
        });
      }
    })
  }

  dateChange(event: MatDatepickerInputEvent<Date>){
    const currentDay = new Date();
    const age = this.calculateAge(event.value!, currentDay);
    console.log(age);
    this.form.patchValue({ age });
  }

  calculateAge(birthday: Date, currentDate: Date): number {
    const diff = currentDate.getTime() - birthday.getTime();
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    return age;
  }

  getFullName(): string{
    const name = this.form.get('name')?.value;
    const lastName = this.form.get('lastName')?.value;
    const secondLastName = this.form.get('secondlastName')?.value;
    return `${ name } ${ lastName } ${ secondLastName }`;
  }

  openSuccessDialog(){
    Swal.fire({
      icon: "success",
      title: "El empleado ha sido registrado!",
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
    })
    .then(() => {
      this.form.reset();
    });
  }
}
