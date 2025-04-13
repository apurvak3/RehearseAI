import { createBrowserRouter, createMemoryRouter } from "react-router-dom";
import Root from "./app/root";
import Home from "./app/routes/home"; 
import Login from "./app/routes/login";
import Signup from "./app/routes/signup";

const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
];

// Export a function that creates the router based on environment
export function createRouter() {
  if (typeof window === 'undefined') {
    // Server: Use memory router
    return createMemoryRouter(routes);
  } else {
    // Browser: Use browser router
    return createBrowserRouter(routes);
  }
}

// Create and export the router
export const router = createRouter();