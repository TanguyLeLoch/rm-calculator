import { Component, signal, computed, inject, effect } from '@angular/core';
import { NumberInputComponent } from '../../components/number-input/number-input.component';
import { FormulaToggleComponent } from '../../components/formula-toggle/formula-toggle.component';
import { LegendComponent } from '../../components/legend/legend.component';
import { RmTableComponent } from '../../components/rm-table/rm-table.component';
import { RmCalculatorService } from '../../services/rm-calculator.service';
import { RmValue } from '../../models/rm-values.model';

@Component({
  selector: 'app-rm-calculator',
  standalone: true,
  imports: [
    NumberInputComponent,
    FormulaToggleComponent,
    LegendComponent,
    RmTableComponent
  ],
  template: `
    <div class="flex flex-col items-center justify-center p-2">
      <h1 class="text-xl font-bold mb-2">RM Calculator</h1>

      <div class="mb-2">
        <app-number-input
          inputId="lastWeight"
          label="Last weight"
          [value]="lastWeight()"
          [step]="increment()"
          (valueChange)="lastWeight.set($event)"
        />

        <app-number-input
          inputId="lastRep"
          label="Last rep number"
          [value]="lastRep()"
          [step]="1"
          (valueChange)="lastRep.set($event)"
          (blur)="updateLastRep($event)"
        />

        <app-number-input
          inputId="increment"
          label="Weight increment"
          [value]="increment()"
          [step]="0.5"
          (valueChange)="increment.set($event)"
        />

        <app-number-input
          inputId="minRep"
          label="Min rep number"
          [value]="minRep()"
          [step]="1"
          (valueChange)="minRep.set($event)"
          (blur)="updateMinRep($event)"
        />

        <app-number-input
          inputId="maxRep"
          label="Max rep number"
          [value]="maxRep()"
          [step]="1"
          (valueChange)="maxRep.set($event)"
          (blur)="updateMaxRep($event)"
        />
      </div>

      <app-rm-table
        [values]="resultsMatrix()"
        [minRep]="minRep()"
        [maxRep]="maxRep()"
      />

      <app-legend />

      <app-formula-toggle
        label1="Brzycki"
        label2="Epley"
        (toggle)="onFormulaToggle($event)"
      />
    </div>
  `
})
export class RmCalculatorComponent {
  private rmService = inject(RmCalculatorService);

  // State signals
  lastWeight = signal(40);
  lastRep = signal(10);
  increment = signal(2.5);
  minRep = signal(8);
  maxRep = signal(10);
  isBrzycki = signal(true);

  // Computed results matrix
  resultsMatrix = computed<RmValue[][]>(() => {
    return this.rmService.computeRmMatrix({
      lastWeight: this.lastWeight(),
      lastReps: this.lastRep(),
      increment: this.increment(),
      minRep: this.minRep(),
      maxRep: this.maxRep(),
      isBrzycki: this.isBrzycki()
    });
  });

  updateLastRep(value: number): void {
    if (value < this.minRep()) {
      this.minRep.set(value);
    } else if (value > this.maxRep()) {
      this.maxRep.set(value);
    }
  }

  updateMinRep(value: number): void {
    if (value > this.maxRep()) {
      this.maxRep.set(value);
    }
  }

  updateMaxRep(value: number): void {
    if (value < this.minRep()) {
      this.minRep.set(value);
    }
  }

  onFormulaToggle(isEpley: boolean): void {
    this.isBrzycki.set(!isEpley);
  }
}
