import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';
import { NotificationPanelComponent } from '../notification-panel/notification-panel.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [NotificationPanelComponent, RouterOutlet, SidebarComponent, TopbarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  private readonly notificationService = inject(NotificationService);

  isSidebarCollapsed = false;
  isMobileSidebarOpen = false;
  isNotificationPanelOpen = false;

  constructor() {
    this.notificationService.startRealtime();
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  openMobileSidebar(): void {
    this.isMobileSidebarOpen = true;
  }

  closeMobileSidebar(): void {
    this.isMobileSidebarOpen = false;
  }

  toggleNotifications(): void {
    this.isNotificationPanelOpen = !this.isNotificationPanelOpen;
  }

  closeNotifications(): void {
    this.isNotificationPanelOpen = false;
  }
}
