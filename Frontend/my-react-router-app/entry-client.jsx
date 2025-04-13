import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Root from "./app/root.jsx";
import Home from "./app/routes/home.jsx";
import Login from "./app/routes/login.jsx";
import Signup from "./app/routes/signup.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Auth0Provider
      domain="YOUR_AUTH0_DOMAIN" // Replace with your Auth0 domain
      clientId="YOUR_AUTH0_CLIENT_ID" // Replace with your Auth0 client ID
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  </StrictMode>
);