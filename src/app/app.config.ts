import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { AuthInterceptor } from './common/interceptors/auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
      provideAnimationsAsync(), 
      provideHttpClient(
        withInterceptors([AuthInterceptor])
      ),
      importProvidersFrom(SocialLoginModule),
      {
        provide: 'SocialAuthServiceConfig',
        useValue : {
          autoLogin: false,
          providers: [
            {
              id : GoogleLoginProvider.PROVIDER_ID,
              provider : new GoogleLoginProvider('489575766377-as3pkncpu62lj5htt2jsrs89t8n2g1rm.apps.googleusercontent.com',{oneTapEnabled : false})
            }
          ]
        } as SocialAuthServiceConfig
      }
    ]
};
