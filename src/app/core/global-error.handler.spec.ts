import { TestBed } from '@angular/core/testing';
import { GlobalErrorHandler } from './global-error.handler';
import { Injector } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

describe('GlobalErrorHandler', () => {
  let handler: GlobalErrorHandler;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HotToastService,
          useValue: {
            error: jasmine.createSpy('error') // mock toast
          }
        }
      ]
    });

    injector = TestBed.inject(Injector);
    handler = new GlobalErrorHandler(injector);
  });

  it('should create', () => {
    expect(handler).toBeTruthy();
  });

  it('should handle an error and show toast', () => {
    const toast = TestBed.inject(HotToastService);
    handler.handleError(new Error('Test error'));
    expect(toast.error).toHaveBeenCalledWith('Test error');
  });
});
