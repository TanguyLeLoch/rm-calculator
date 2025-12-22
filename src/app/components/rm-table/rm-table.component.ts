import { Component, input, inject } from '@angular/core';
import { RmValue } from '../../models/rm-values.model';
import { RmCalculatorService } from '../../services/rm-calculator.service';

@Component({
  selector: 'app-rm-table',
  standalone: true,
  template: `
    @if (values() && values().length > 0) {
      <table class="border-collapse mx-auto my-4">
        <thead>
          <tr>
            <th class="p-2 border-b border-white text-sm">W \\ R</th>
            @for (rep of repHeaders(); track rep) {
              <th class="p-2 border-b border-white text-sm">{{ rep }}</th>
            }
          </tr>
        </thead>
        <tbody>
          @for (row of values(); track $index) {
            <tr>
              <td class="p-2 border-r border-white text-sm">
                {{ rmService.formatNumber(row[0].weight) }}
              </td>
              @for (cell of row; track $index) {
                <td
                  class="p-2 border-r border-white/30 text-sm text-center"
                  [style.backgroundColor]="cell.color"
                  [style.color]="cell.textColor">
                  {{ rmService.formatNumber(cell.value) }}
                </td>
              }
            </tr>
          }
        </tbody>
      </table>
    }
  `
})
export class RmTableComponent {
  values = input.required<RmValue[][]>();
  minRep = input.required<number>();
  maxRep = input.required<number>();

  rmService = inject(RmCalculatorService);

  repHeaders(): number[] {
    const min = this.minRep();
    const max = this.maxRep();
    return Array.from({ length: max - min + 1 }, (_, i) => i + min);
  }
}
