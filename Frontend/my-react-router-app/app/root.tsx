// app/root.tsx
import { Outlet } from "react-router-dom";
import AuthProvider from "../auth/AuthProvider";

export default function Root() {
  return (
    <AuthProvider>
      <div>
        {/* Common layout ya header yahan aa sakta hai */}
        <Outlet />
      </div>
    </AuthProvider>
  );
}
