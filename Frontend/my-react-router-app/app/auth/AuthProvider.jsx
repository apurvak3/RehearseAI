import { Auth0Provider } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export default function AuthProvider({ children }) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return just the children during server-side rendering
    return children;
  }

  return (
    <Auth0Provider
      domain="YOUR_AUTH0_DOMAIN"
      clientId="YOUR_AUTH0_CLIENT_ID"
      authorizationParams={{
        redirect_uri: typeof window !== 'undefined' ? window.location.origin : ''
      }}
    >
      {children}
    </Auth0Provider>
  );
}