// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// import config from '../../auth_config.json';

const { domain, clientId, audience, apiUri, errorPath } = {
  domain: 'dev-49fsv0cc.us.auth0.com',
  clientId: '8p2suau1b9uiqioSQ0tejKtnPb1vz5F7',
  audience: 'https://dev-49fsv0cc.us.auth0.com/api/v2/',
  apiUri: 'https://localhost:3001/',
  errorPath: '/error'
};

export const environment = {
  production: false,
  auth: {
    domain,
    clientId,
    ...(audience && audience !== 'YOUR_API_IDENTIFIER' ? { audience } : null),
    redirectUri: window.location.origin,
    errorPath,
  },
  apiUri: apiUri,
  httpInterceptor: {
    allowedList: [`${apiUri}/*`],
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
