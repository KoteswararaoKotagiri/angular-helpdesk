import { Routes } from '@angular/router';

export const TICKETS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/ticket-list-page/ticket-list-page.component').then((m) => m.TicketListPageComponent)
  }
];
