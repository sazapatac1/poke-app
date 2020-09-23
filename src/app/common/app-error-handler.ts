import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {
  handleError(err) {
    alert('An unexpected error ocurred.');
    console.log('Error: ' + err);
  }
}
