import { APP_INITIALIZER, ApplicationConfig,ErrorHandler,provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHotToastConfig } from '@ngneat/hot-toast';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { GlobalErrorHandler } from './core/global-error.handler';
import { CredentialsInterceptor } from './core/interceptors/credentials.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthService } from '../app/core/services/auth.service';

function initAuthFactory(authService: AuthService) {
  return () => authService.initAuth();
}

export const appConfig: ApplicationConfig = {
  providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
      provideAnimations(),
      provideHttpClient(withInterceptors([AuthInterceptor,CredentialsInterceptor])),
      provideHotToastConfig({position : 'top-right', dismissible : true, duration: 3000}),
      {provide : ErrorHandler, useClass : GlobalErrorHandler},
      AuthService,
      {
        provide: APP_INITIALIZER,
        useFactory: initAuthFactory,
        deps: [AuthService],
        multi: true,
      }
    ]
};
