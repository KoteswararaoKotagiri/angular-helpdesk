import { Component } from '@angular/core';
import { TicketListPageComponent } from './pages/ticket-list-page/ticket-list-page.component';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [TicketListPageComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent {}
