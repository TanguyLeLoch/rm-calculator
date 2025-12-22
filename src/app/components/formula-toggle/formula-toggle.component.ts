import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleSwitch } from 'primeng/toggleswitch';

@Component({
  selector: 'app-formula-toggle',
  standalone: true,
  imports: [FormsModule, ToggleSwitch],
  template: `
    <div class="flex items-center justify-center gap-3 mt-4">
      <span
        class="text-xs px-1 transition-all duration-200"
        [class.border]="!isToggled()"
        [class.border-white/50]="!isToggled()"
        [class.rounded]="!isToggled()">
        {{ label1() }}
      </span>
      <p-toggleswitch
        [(ngModel)]="isToggled"
        (ngModelChange)="onToggle($event)"
      />
      <span
        class="text-xs px-1 transition-all duration-200"
        [class.border]="isToggled()"
        [class.border-white/50]="isToggled()"
        [class.rounded]="isToggled()">
        {{ label2() }}
      </span>
    </div>
  `
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
