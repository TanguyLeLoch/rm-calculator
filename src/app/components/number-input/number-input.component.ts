import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';

@Component({
  selector: 'app-number-input',
  standalone: true,
  imports: [FormsModule, InputNumber],
  template: `
    <div class="flex items-center gap-3 mb-3">
      <label [for]="inputId()" class="w-36 text-sm text-gray-300">
        {{ label() }}
      </label>
      <p-inputnumber
        [inputId]="inputId()"
        [(ngModel)]="internalValue"
        [showButtons]="true"
        buttonLayout="horizontal"
        [step]="step()"
        incrementButtonIcon="pi pi-plus"
        decrementButtonIcon="pi pi-minus"
        [minFractionDigits]="0"
        [maxFractionDigits]="2"
        (onFocus)="onFocus()"
        (onBlur)="handleBlur()"
        (ngModelChange)="onValueChange($event)"
        [inputStyle]="{ width: '80px', textAlign: 'center' }"
      />
    </div>
    <div
      class="text-xs text-gray-400 mb-4 ml-36 pl-3 transition-opacity duration-300"
      [class.opacity-100]="isFocused()"
      [class.opacity-0]="!isFocused()">
      {{ helpText() }}
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

  onFocus(): void {
    this.isFocused.set(true);
  }

  handleBlur(): void {
    this.isFocused.set(false);
    this.blur.emit(this.value());
  }

  onValueChange(val: number): void {
    this.valueChange.emit(val);
  }
}
