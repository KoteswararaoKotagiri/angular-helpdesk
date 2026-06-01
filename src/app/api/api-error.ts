import { HttpErrorResponse } from '@angular/common/http';

export interface ApiError {
  status: number;
  message: string;
  details?: unknown;
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 0) {
      return { status: 0, message: 'Network error. Please check your connection.', details: error };
    }

    const body = error.error as { message?: string; title?: string; errors?: unknown } | string | null;
    const message =
      typeof body === 'string'
        ? body
        : body?.message ?? body?.title ?? defaultMessage(error.status);

    return { status: error.status, message, details: typeof body === 'object' ? body?.errors ?? body : body };
  }

  return { status: 500, message: 'Unexpected application error.', details: error };
}

function defaultMessage(status: number): string {
  switch (status) {
    case 401:
      return 'Your session has expired. Please sign in again.';
    case 403:
      return 'You do not have permission to perform this action.';
    case 404:
      return 'The requested resource was not found.';
    case 500:
      return 'Server error. Please try again later.';
    default:
      return 'Request failed. Please try again.';
  }
}
