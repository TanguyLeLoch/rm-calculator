import { Component } from '@angular/core';
import { RmCalculatorComponent } from './pages/rm-calculator/rm-calculator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RmCalculatorComponent],
  template: `
    <main class="min-h-screen">
      <app-rm-calculator />
    </main>
  `
})
export class App {}
