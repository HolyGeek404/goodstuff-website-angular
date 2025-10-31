import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import { routes } from './app.routes';
import {MsalInterceptor, MsalService} from '@azure/msal-angular';
import {InteractionType, PublicClientApplication} from '@azure/msal-browser';
import {environment} from '../environments/environment';

export function MSALInstanceFactory() {
  return new PublicClientApplication({
    auth: {
      clientId: environment.azure.clientId,
      authority: environment.azure.authority,
      redirectUri: environment.azure.redirectUri
    },
    cache: {
      cacheLocation: 'localStorage',
    }
  });
}

export function MSALInterceptorConfigFactory() {
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap: new Map([
      [
        environment.afUrl,
        [`api://${environment.afAppId}/user_impersonation`]
      ]
    ])
  };
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // ✅ HttpClient + DI interceptor support
    provideHttpClient(withInterceptorsFromDi()),

    // ✅ MSAL providers (standalone way)
    {
      provide: 'MSAL_INSTANCE',
      useFactory: MSALInstanceFactory
    },
    {
      provide: 'MSAL_INTERCEPTOR_CONFIG',
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,

    // ✅ Register MSAL interceptor
    { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true }
  ]
};
