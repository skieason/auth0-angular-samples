import config from '../../auth_config.json';

const { domain, clientId, audience, apiUri, errorPath } = {
  domain: 'dev-49fsv0cc.us.auth0.com',
  clientId: '8p2suau1b9uiqioSQ0tejKtnPb1vz5F7',
  audience: 'https://dev-49fsv0cc.us.auth0.com/api/v2/',
  apiUri: 'https://phil-pizza42-api.herokuapp.com/',
  errorPath: '/error'
};

export const environment = {
  production: true,
  auth: {
    domain,
    clientId,
    ...(audience && audience !== "YOUR_API_IDENTIFIER" ? { audience } : null),
    redirectUri: window.location.origin,
    errorPath,
  },
  httpInterceptor: {
    allowedList: [`${apiUri}/*`],
  },
};
