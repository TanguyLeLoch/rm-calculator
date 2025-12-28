import { Component, input, inject, computed } from '@angular/core';
import { NgClass } from '@angular/common';
import { TableModule } from 'primeng/table';
import { RmValue } from '../../models/rm-values.model';
import { RmCalculatorService } from '../../services/rm-calculator.service';

@Component({
  selector: 'app-rm-table',
  standalone: true,
  imports: [NgClass, TableModule],
  templateUrl: './rm-table.component.html'
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
