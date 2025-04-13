export const auth0Config = {
  domain: 'your-auth0-domain.auth0.com',
  clientId: 'your-client-id',
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: 'https://your-api-audience',
  }
};
