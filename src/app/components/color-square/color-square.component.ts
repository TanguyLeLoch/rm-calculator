import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-color-square',
  standalone: true,
  imports: [NgClass],
  templateUrl: './color-square.component.html'
})
export class ColorSquareComponent {
  color = input.required<string>();
}
