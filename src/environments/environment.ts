export const environment = {
  production: false,
  afUrl: 'http://localhost:4200/api', // through proxy -> goes to http://localhost:7071/api
  azure: {
    tenantId: '<TENANT_ID>',
    clientId: '<SPA_CLIENT_ID>',
    authority: 'https://sign-in.microsoftonline.com/<TENANT_ID>',
    redirectUri: 'http://localhost:4200'
  },
  afAppId: '<AF_CLIENT_ID>' // used in scopes
};
