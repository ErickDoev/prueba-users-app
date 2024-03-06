import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-error-msg',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './error-msg.component.html',
  styleUrl: './error-msg.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMsgComponent {
  errorMessage: string | undefined;

  @Input() set errors(value: any){
    if (value.required) {
        this.errorMessage = `Este campo es obligatorio`;
      }
  }

}
