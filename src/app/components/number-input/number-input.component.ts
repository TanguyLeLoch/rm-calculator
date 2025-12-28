import { Component, input, output, signal, computed, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { Button } from 'primeng/button';
import { SelectButton } from 'primeng/selectbutton';

@Component({
  selector: 'app-number-input',
  standalone: true,
  imports: [FormsModule, InputNumber, Button, SelectButton],
  templateUrl: './number-input.component.html'
})
export class NumberInputComponent {
  inputId = input.required<string>();
  label = input.required<string>();
  value = input.required<number>();
  helpText = input<string>('');
  step = input<number>(1);
  quickValues = input<number[]>([]);
  autoBlurOnTwoDigits = input<boolean>(false);

  valueChange = output<number>();
  blur = output<number>();

  private inputNumberRef = viewChild<InputNumber>('inputNumber');
  isFocused = signal(false);

  quickOptions = computed(() =>
    this.quickValues().map(v => ({
      label: this.formatQuickValue(v),
      value: v
    }))
  );

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

  private pendingBlurValue: number | null = null;

  handleBlur(): void {
    this.isFocused.set(false);
    // Use pending value if set by auto-blur, otherwise use current value
    const valueToEmit = this.pendingBlurValue ?? this.value();
    this.pendingBlurValue = null;
    this.blur.emit(valueToEmit);
  }

  onValueChange(val: number): void {
    this.valueChange.emit(val);

    // Auto-blur when value reaches 2 digits
    if (this.autoBlurOnTwoDigits() && val >= 10) {
      this.pendingBlurValue = val;
      this.inputNumberRef()?.input?.nativeElement?.blur();
    }
  }

  increment(): void {
    const newVal = this.value() + this.step();
    this.valueChange.emit(newVal);
  }

  decrement(): void {
    const newVal = this.value() - this.step();
    this.valueChange.emit(newVal);
  }

  selectQuickValue(val: number): void {
    if (val !== null && val !== undefined) {
      this.valueChange.emit(val);
    }
  }

  private formatQuickValue(val: number): string {
    return Number.isInteger(val) ? val.toString() : val.toFixed(1);
  }
}
