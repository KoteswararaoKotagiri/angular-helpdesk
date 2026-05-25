import { Component } from '@angular/core';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardPageComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {}
