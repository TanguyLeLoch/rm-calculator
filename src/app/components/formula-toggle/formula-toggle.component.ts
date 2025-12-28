import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleSwitch } from 'primeng/toggleswitch';

@Component({
  selector: 'app-formula-toggle',
  standalone: true,
  imports: [FormsModule, ToggleSwitch],
  templateUrl: './formula-toggle.component.html'
})
export class FormulaToggleComponent {
  label1 = input<string>('Brzycki');
  label2 = input<string>('Epley');

  toggle = output<boolean>();

  isToggled = signal(false);

  onToggle(value: boolean): void {
    this.isToggled.set(value);
    this.toggle.emit(value);
  }
}
