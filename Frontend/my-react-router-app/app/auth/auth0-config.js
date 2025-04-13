export const auth0Config = {
  domain: 'dev-3ok703ekkc46q0ds.us.auth0.com',
  clientId: 'W28RhjrtCEsDme4LknolFcLKetdOi5qc',
  authorizationParams: {
    redirect_uri: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
    audience: 'https://rehearseai-api',
  }
};
