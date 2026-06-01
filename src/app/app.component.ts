import { DOCUMENT } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly document = inject(DOCUMENT);

  title = 'angular-helpdesk';

  ngOnInit(): void {
    const storedTheme = localStorage.getItem('helpdesk-theme');
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const theme = storedTheme ?? (prefersDark ? 'dark' : 'light');

    this.document.documentElement.setAttribute('data-theme', theme);
  }
}
