import { Component, input } from '@angular/core';

@Component({
  selector: 'app-color-square',
  standalone: true,
  template: `
    <span
      class="inline-block w-3 h-3 mr-1"
      [style.backgroundColor]="color()">
    </span>
  `
})
export class ColorSquareComponent {
  color = input.required<string>();
}
