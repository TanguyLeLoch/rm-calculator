import { Component, input, output, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-number-input',
  standalone: true,
  imports: [FormsModule, InputNumber, Button],
  template: `
    <div class="flex items-center gap-2 mb-1">
      <label [for]="inputId()" class="w-32 text-sm text-gray-300">
        {{ label() }}
      </label>
      <div class="flex items-center gap-1">
        <p-button
          icon="pi pi-minus"
          [rounded]="true"
          [text]="true"
          severity="secondary"
          size="small"
          (onClick)="decrement($event)"
        />
        <p-inputnumber
          [inputId]="inputId()"
          [(ngModel)]="displayValue"
          [showButtons]="false"
          [minFractionDigits]="0"
          [maxFractionDigits]="2"
          (onFocus)="onFocus($event)"
          (onBlur)="handleBlur()"
          [inputStyle]="{ width: '60px', textAlign: 'center', fontSize: '14px' }"
        />
        <p-button
          icon="pi pi-plus"
          [rounded]="true"
          [text]="true"
          severity="secondary"
          size="small"
          (onClick)="increment($event)"
        />
      </div>
    </div>
  `
})
export class NumberInputComponent {
  inputId = input.required<string>();
  label = input.required<string>();
  value = input.required<number>();
  helpText = input<string>('');
  step = input<number>(1);

  valueChange = output<number>();
  blur = output<number>();

  displayValue = 0;
  private isFocused = false;

  constructor() {
    // Sync display value from parent when not focused
    effect(() => {
      const parentValue = this.value();
      if (!this.isFocused) {
        this.displayValue = parentValue;
      }
    });
  }

  onFocus(event: Event): void {
    this.isFocused = true;
    const input = event.target as HTMLInputElement;
    if (input) {
      setTimeout(() => input.select(), 0);
    }
  }

  handleBlur(): void {
    this.isFocused = false;
    this.valueChange.emit(this.displayValue);
    this.blur.emit(this.displayValue);
  }

  increment(event: Event): void {
    event.preventDefault();
    (event.target as HTMLElement)?.closest('button')?.blur();
    const newVal = this.displayValue + this.step();
    this.displayValue = newVal;
    this.valueChange.emit(newVal);
    this.blur.emit(newVal);
  }

  decrement(event: Event): void {
    event.preventDefault();
    (event.target as HTMLElement)?.closest('button')?.blur();
    const newVal = this.displayValue - this.step();
    this.displayValue = newVal;
    this.valueChange.emit(newVal);
    this.blur.emit(newVal);
  }
}
