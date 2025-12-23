import { Component, input, inject, computed } from '@angular/core';
import { NgClass } from '@angular/common';
import { TableModule } from 'primeng/table';
import { RmValue } from '../../models/rm-values.model';
import { RmCalculatorService } from '../../services/rm-calculator.service';

@Component({
  selector: 'app-rm-table',
  standalone: true,
  imports: [NgClass, TableModule],
  template: `
    @if (values() && values().length > 0) {
      <p-table
        [value]="values()"
        [tableStyle]="{ 'min-width': 'auto' }"
        styleClass="p-datatable-sm">
        <ng-template pTemplate="header">
          <tr>
            <th class="text-xs p-1">W \\ R</th>
            @for (rep of repHeaders(); track rep) {
              <th class="text-xs p-1">{{ rep }}</th>
            }
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-row>
          <tr>
            <td class="text-xs p-1">
              {{ rmService.formatNumber(row[0].weight) }}
            </td>
            @for (cell of row; track cell.reps) {
              <td
                class="text-xs p-1 text-center"
                [ngClass]="[cell.color, cell.textColor]">
                {{ rmService.formatNumber(cell.value) }}
              </td>
            }
          </tr>
        </ng-template>
      </p-table>
    }
  `
})
export class RmTableComponent {
  values = input.required<RmValue[][]>();
  minRep = input.required<number>();
  maxRep = input.required<number>();

  rmService = inject(RmCalculatorService);

  repHeaders = computed(() => {
    const min = this.minRep();
    const max = this.maxRep();
    return Array.from({ length: max - min + 1 }, (_, i) => i + min);
  });
}
