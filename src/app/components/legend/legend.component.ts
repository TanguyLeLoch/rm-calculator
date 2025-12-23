import { Component } from '@angular/core';
import { ColorSquareComponent } from '../color-square/color-square.component';

@Component({
  selector: 'app-legend',
  standalone: true,
  imports: [ColorSquareComponent],
  template: `
    <ul class="list-none p-0 m-4 text-xs">
      <li class="flex items-center mb-1">
        <app-color-square color="bg-green-500" />
        <span class="pl-1">Your last 1RM</span>
      </li>
      <li class="flex items-center mb-1">
        <app-color-square color="bg-orange-500" />
        <span class="pl-1">Your goal today</span>
      </li>
      <li class="flex items-center mb-1">
        <app-color-square color="bg-yellow-400" />
        <span class="pl-1">The best 1RM / rep</span>
      </li>
    </ul>
  `
})
export class LegendComponent {}
