import { Injectable } from '@angular/core';
import { ApiError, toApiError } from '../../api/api-error';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  normalize(error: unknown): ApiError {
    return toApiError(error);
  }

  userMessage(error: unknown): string {
    return this.normalize(error).message;
  }
}
