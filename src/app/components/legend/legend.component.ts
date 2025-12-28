import { Component } from '@angular/core';
import { ColorSquareComponent } from '../color-square/color-square.component';

@Component({
  selector: 'app-legend',
  standalone: true,
  imports: [ColorSquareComponent],
  templateUrl: './legend.component.html'
})
export class LegendComponent {}
