import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-color-square',
  standalone: true,
  imports: [NgClass],
  template: `
    <span
      class="inline-block w-3 h-3 mr-1 rounded"
      [ngClass]="color()">
    </span>
  `
})
export class ColorSquareComponent {
  color = input.required<string>();
}
