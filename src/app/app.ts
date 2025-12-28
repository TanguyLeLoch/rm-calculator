import { Component } from '@angular/core';
import { RmCalculatorComponent } from './pages/rm-calculator/rm-calculator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RmCalculatorComponent],
  templateUrl: './app.html'
})
export class App {}
