import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule
  ],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent {
  @Input() title: string = '';
 }
