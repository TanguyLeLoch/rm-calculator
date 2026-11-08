import { Injectable } from '@angular/core';
import { RmCalculatorInput, RmValue } from '../models/rm-values.model';

@Injectable({
  providedIn: 'root'
})
export class RmCalculatorService {

  // Hevy's rep-to-percentage table (index = reps - 1), see
  // https://help.hevyapp.com/hc/en-us/articles/36954464726167
  private static readonly HEVY_PERCENTAGES = [
    1.00, 0.97, 0.94, 0.92, 0.89, 0.86, 0.83, 0.81, 0.78, 0.75,
    0.73, 0.71, 0.70, 0.68, 0.67, 0.65, 0.64, 0.63, 0.61, 0.60,
    0.59, 0.58, 0.57, 0.56, 0.55, 0.54, 0.53, 0.52, 0.51, 0.50
  ];

  calculateRm(weight: number, reps: number): number {
    const table = RmCalculatorService.HEVY_PERCENTAGES;
    const index = Math.min(Math.max(Math.round(reps), 1), table.length) - 1;
    return weight / table[index];
  }

  computeRmMatrix(input: RmCalculatorInput): RmValue[][] {
    const {lastWeight, lastReps, increment, minRep, maxRep} = input;

    if (!this.validateInput(input)) {
      return [];
    }

    const currentRm = this.calculateRm(lastWeight, lastReps);
    const setColorPerRep = new Set<number>();
    const yellows: RmValue[] = [];
    const values: RmValue[][] = [];

    for (let w = lastWeight - 5 * increment; w <= lastWeight + 4 * increment; w += increment) {
      const line: RmValue[] = [];

      for (let r = minRep; r <= maxRep; r++) {
        const rm = this.calculateRm(w, r);
        let bgColor: string;
        let textColor: string;

        if (rm < currentRm) {
          bgColor = 'bg-gray-500';
          textColor = 'text-white';
        } else if (w === lastWeight && r === lastReps) {
          bgColor = 'bg-green-500';
          textColor = 'text-black';
        } else if (r !== lastReps && rm > currentRm && !setColorPerRep.has(r)) {
          setColorPerRep.add(r);
          bgColor = 'bg-yellow-400';
          textColor = 'text-black';
        } else {
          bgColor = 'bg-surface-100';
          textColor = 'text-surface-900';
        }

        const rmValue: RmValue = {
          value: rm,
          color: bgColor,
          reps: r,
          weight: w,
          textColor
        };

        line.push(rmValue);

        if (bgColor === 'bg-yellow-400') {
          yellows.push(rmValue);
        }
      }

      values.push(line);
    }

    // Find the minimum yellow value and mark it as orange (goal)
    if (yellows.length > 0) {
      let minValue = yellows[0];
      minValue.color = 'bg-orange-500';

      for (const y of yellows) {
        if (y.value < minValue.value) {
          minValue.color = 'bg-yellow-400';
          minValue = y;
          minValue.color = 'bg-orange-500';
        }
      }
    }

    return values;
  }

  private validateInput(input: RmCalculatorInput): boolean {
    const {lastWeight, lastReps, increment, minRep, maxRep} = input;

    const fields = [lastWeight, lastReps, increment, minRep, maxRep];

    for (const field of fields) {
      if (field === undefined || field === null || isNaN(field)) {
        return false;
      }
      if (field < 0) {
        return false;
      }
    }

    if (maxRep < minRep) {
      return false;
    }

    return increment > 0;

  }

  formatNumber(num: number): string {
    const formatted = num.toFixed(2);
    return formatted.endsWith('.00') ? formatted.slice(0, -3) : formatted;
  }
}
