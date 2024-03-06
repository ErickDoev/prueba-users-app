import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-white-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './white-card.component.html',
  styleUrl: './white-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhiteCardComponent { }
