import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { HotToastService } from "@ngneat/hot-toast";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleError(error: any): void {

    const toast = this.injector.get(HotToastService);

    let message = 'An unexpected error occurred.';

    if(error instanceof HttpErrorResponse && error.error.message !== '')
    {
        message = error.error.message;
    }
    else if(typeof error === 'string')
    {
        message = error;
    }
    else if (error?.message)
    {
        message = error.message;
    }

    toast.error(message);

  }
}
