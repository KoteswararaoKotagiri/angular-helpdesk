import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { AsyncPipe, DOCUMENT } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatTooltipModule,
    RouterLink
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);

  @Input() hasUnreadNotifications = false;
  @Output() sidebarToggle = new EventEmitter<void>();
  @Output() mobileMenuOpen = new EventEmitter<void>();
  @Output() notificationsToggle = new EventEmitter<void>();

  readonly pageTitle$ = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map((event) => this.resolveTitle(event.urlAfterRedirects)),
    startWith(this.resolveTitle(this.router.url))
  );

  isDarkTheme = false;

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.document.documentElement.setAttribute('data-theme', this.isDarkTheme ? 'dark' : 'light');
  }

  private resolveTitle(url: string): string {
    if (url.startsWith('/tickets')) {
      return 'Tickets';
    }

    if (url.startsWith('/admin')) {
      return 'Admin panel';
    }

    return 'Dashboard';
  }
}
