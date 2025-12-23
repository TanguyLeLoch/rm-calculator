import { Component, input, output, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-number-input',
  standalone: true,
  imports: [FormsModule, InputNumber, Button],
  template: `
    <div class="flex items-center gap-2 mb-1">
      <label [for]="inputId()" class="w-32 text-sm">
        {{ label() }}
      </label>
      <div class="flex items-center gap-1">
        <p-button
          icon="pi pi-minus"
          [rounded]="true"
          [text]="true"
          severity="secondary"
          size="small"
          [tabindex]="-1"
          (onClick)="decrement()"
        />
        <p-inputnumber
          [inputId]="inputId()"
          [(ngModel)]="internalValue"
          [showButtons]="false"
          [minFractionDigits]="0"
          [maxFractionDigits]="2"
          (onFocus)="onFocus($event)"
          (onBlur)="handleBlur()"
          (ngModelChange)="onValueChange($event)"
          [inputStyle]="{ width: '60px', textAlign: 'center', fontSize: '14px' }"
        />
        <p-button
          icon="pi pi-plus"
          [rounded]="true"
          [text]="true"
          severity="secondary"
          size="small"
          [tabindex]="-1"
          (onClick)="increment()"
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

  isFocused = signal(false);

  get internalValue(): number {
    return this.value();
  }

  set internalValue(val: number) {
    this.valueChange.emit(val);
  }

  onFocus(event: Event): void {
    this.isFocused.set(true);
    const input = event.target as HTMLInputElement;
    if (input) {
      setTimeout(() => input.select(), 0);
    }
  }

  handleBlur(): void {
    this.isFocused.set(false);
    this.blur.emit(this.value());
  }

  onValueChange(val: number): void {
    this.valueChange.emit(val);
  }

  increment(): void {
    const newVal = this.value() + this.step();
    this.valueChange.emit(newVal);
  }

  decrement(): void {
    const newVal = this.value() - this.step();
    this.valueChange.emit(newVal);
  }
}
