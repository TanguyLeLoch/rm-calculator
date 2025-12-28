import { Component, computed, inject, signal } from '@angular/core';
import { NumberInputComponent } from '../../components/number-input/number-input.component';
import { FormulaToggleComponent } from '../../components/formula-toggle/formula-toggle.component';
import { LegendComponent } from '../../components/legend/legend.component';
import { RmTableComponent } from '../../components/rm-table/rm-table.component';
import { DarkModeToggleComponent } from '../../components/dark-mode-toggle/dark-mode-toggle.component';
import { RmCalculatorService } from '../../services/rm-calculator.service';
import { RmValue } from '../../models/rm-values.model';

@Component({
  selector: 'app-rm-calculator',
  standalone: true,
  imports: [
    NumberInputComponent,
    FormulaToggleComponent,
    LegendComponent,
    RmTableComponent,
    DarkModeToggleComponent
  ],
  templateUrl: './rm-calculator.component.html'
})
export class RmCalculatorComponent {
  private rmService = inject(RmCalculatorService);

  // State signals
  lastWeight = signal(41);
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
