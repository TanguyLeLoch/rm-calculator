import { Component, input, output, signal, computed } from '@angular/core';
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

  valueChange = output<number>();
  blur = output<number>();

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

  selectQuickValue(val: number): void {
    if (val !== null && val !== undefined) {
      this.valueChange.emit(val);
    }
  }

  private formatQuickValue(val: number): string {
    return Number.isInteger(val) ? val.toString() : val.toFixed(1);
  }
}
