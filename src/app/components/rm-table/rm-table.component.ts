import { Component, input, inject, computed } from '@angular/core';
import { NgClass } from '@angular/common';
import { RmValue } from '../../models/rm-values.model';
import { RmCalculatorService } from '../../services/rm-calculator.service';

@Component({
  selector: 'app-rm-table',
  standalone: true,
  template: `
    @if (values() && values().length > 0) {
      <table class="border-collapse mx-auto my-2">
        <thead>
          <tr>
            <th class="p-1 border-b border-white text-xs">W \\ R</th>
            @for (rep of repHeaders(); track rep) {
              <th class="p-1 border-b border-white text-xs">{{ rep }}</th>
            }
          </tr>
        </thead>
        <tbody>
          @for (row of values(); track row[0].weight) {
            <tr>
              <td class="p-1 border-r border-white text-xs">
                {{ rmService.formatNumber(row[0].weight) }}
              </td>
              @for (cell of row; track cell.reps) {
                <td
                  class="p-1 border-r border-white/30 text-xs text-center"
                  [ngClass]="[cell.color, cell.textColor]">
                  {{ rmService.formatNumber(cell.value) }}
                </td>
              }
            </tr>
          }
        </tbody>
      </table>
    }
  `,
  imports: [NgClass]
})
export class RmTableComponent {
  values = input.required<RmValue[][]>();
  minRep = input.required<number>();
  maxRep = input.required<number>();

  rmService = inject(RmCalculatorService);

  // Use computed signal instead of method to avoid recalculation
  repHeaders = computed(() => {
    const min = this.minRep();
    const max = this.maxRep();
    return Array.from({ length: max - min + 1 }, (_, i) => i + min);
  });
}
