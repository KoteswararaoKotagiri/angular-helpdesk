import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { finalize, forkJoin, of, catchError } from 'rxjs';
import { SlaApi } from '../../api/sla.api';
import { SlaPerformanceResponse, SlaTicketResponse } from '../../api/dtos';
import { ErrorHandlerService } from '../../core/services/error-handler.service';

interface SlaMetric {
  label: string;
  value: string;
  tone: string;
}

@Component({
  selector: 'app-sla-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTabsModule],
  templateUrl: './sla-page.component.html',
  styleUrl: './sla-page.component.scss'
})
export class SlaPageComponent {
  private readonly slaApi = inject(SlaApi);
  private readonly errorHandler = inject(ErrorHandlerService);
  private readonly destroyRef = inject(DestroyRef);

  isLoading = false;
  error: string | null = null;

  metrics: SlaMetric[] = [];
  countdown: SlaTicketResponse[] = [];
  overdue: SlaTicketResponse[] = [];
  breaches: SlaTicketResponse[] = [];
  nearBreach: SlaTicketResponse[] = [];

  constructor() {
    this.load();
  }

  refresh(): void {
    this.load();
  }

  slaTone(status: string): string {
    switch (status) {
      case 'Met':
      case 'OnTrack':
        return 'green';
      case 'AtRisk':
        return 'amber';
      case 'Breached':
        return 'red';
      default:
        return 'neutral';
    }
  }

  formatRemaining(minutes: number): string {
    const abs = Math.abs(Math.round(minutes));
    const label = `${Math.floor(abs / 60)}h ${abs % 60}m`;
    return minutes < 0 ? `${label} overdue` : `${label} left`;
  }

  private load(): void {
    this.isLoading = true;
    this.error = null;

    forkJoin({
      performance: this.slaApi.getPerformance().pipe(catchError(() => of(null))),
      countdown: this.slaApi.getCountdown().pipe(catchError(() => of([] as SlaTicketResponse[]))),
      overdue: this.slaApi.getOverdue().pipe(catchError(() => of([] as SlaTicketResponse[]))),
      breaches: this.slaApi.getBreaches().pipe(catchError(() => of([] as SlaTicketResponse[]))),
      near: this.slaApi.getNearBreach().pipe(catchError(() => of([] as SlaTicketResponse[])))
    })
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          if (!res.performance && res.countdown.length === 0 && res.overdue.length === 0 && res.breaches.length === 0) {
            this.error = 'Unable to load SLA data. Please try again.';
            return;
          }
          this.metrics = this.buildMetrics(res.performance);
          this.countdown = res.countdown;
          this.overdue = res.overdue;
          this.breaches = res.breaches;
          this.nearBreach = res.near;
        },
        error: (e: unknown) => (this.error = this.errorHandler.userMessage(e))
      });
  }

  private buildMetrics(performance: SlaPerformanceResponse | null): SlaMetric[] {
    if (!performance) {
      return [];
    }
    return [
      { label: 'SLA compliance', value: `${performance.compliancePercent}%`, tone: performance.compliancePercent >= 90 ? 'green' : performance.compliancePercent >= 75 ? 'amber' : 'red' },
      { label: 'Met', value: String(performance.met), tone: 'green' },
      { label: 'Breached', value: String(performance.breached), tone: 'red' },
      { label: 'At risk', value: String(performance.atRisk), tone: 'amber' },
      { label: 'Overdue', value: String(performance.overdue), tone: 'red' }
    ];
  }
}
