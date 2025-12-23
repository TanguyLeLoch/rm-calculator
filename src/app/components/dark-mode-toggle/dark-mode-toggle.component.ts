import { Component, signal, DOCUMENT, inject } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-dark-mode-toggle',
  standalone: true,
  imports: [Button],
  template: `
    <p-button
      [icon]="isDark() ? 'pi pi-sun' : 'pi pi-moon'"
      [rounded]="true"
      [text]="true"
      severity="secondary"
      (onClick)="toggle()"
      [tabindex]="-1"
    />
  `
})
export class DarkModeToggleComponent {
  private document = inject(DOCUMENT);
  isDark = signal(false);

  toggle(): void {
    this.isDark.update(v => !v);
    const html = this.document.documentElement;
    if (this.isDark()) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }
}
