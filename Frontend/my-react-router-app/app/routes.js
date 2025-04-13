import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./app/root";
import Home from "./app/routes/home";
import Login from "./app/routes/login";
import Signup from "./app/routes/signup";

// Define routes client-side
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Login /> }, // Set login as default route
      { path: "home", element: <Home /> },
      { path: "signup", element: <Signup /> }
    ]
  }
]);

// Client-side rendering
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);