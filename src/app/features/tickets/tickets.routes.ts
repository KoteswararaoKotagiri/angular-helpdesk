import { Routes } from '@angular/router';

export const TICKETS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/ticket-list-page/ticket-list-page.component').then((m) => m.TicketListPageComponent)
  },
  {
    path: ':ticketId',
    loadComponent: () =>
      import('./pages/ticket-details-page/ticket-details-page.component').then((m) => m.TicketDetailsPageComponent)
  }
];
