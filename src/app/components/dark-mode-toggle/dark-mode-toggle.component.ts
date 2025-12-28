import { Component, signal, DOCUMENT, inject, OnInit } from '@angular/core';
import { Button } from 'primeng/button';

const DARK_MODE_KEY = 'darkMode';

@Component({
  selector: 'app-dark-mode-toggle',
  standalone: true,
  imports: [Button],
  templateUrl: './dark-mode-toggle.component.html'
})
export class DarkModeToggleComponent implements OnInit {
  private document = inject(DOCUMENT);
  isDark = signal(false);

  ngOnInit(): void {
    const savedPreference = localStorage.getItem(DARK_MODE_KEY);
    if (savedPreference !== null) {
      this.isDark.set(savedPreference === 'true');
    } else {
      // Default to system preference
      this.isDark.set(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    this.applyTheme();
  }

  toggle(): void {
    this.isDark.update(v => !v);
    localStorage.setItem(DARK_MODE_KEY, String(this.isDark()));
    this.applyTheme();
  }

  private applyTheme(): void {
    const html = this.document.documentElement;
    if (this.isDark()) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }
}
