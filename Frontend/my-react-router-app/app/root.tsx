// app/root.tsx
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div>
      {/* Common layout ya header yahan aa sakta hai */}
      <Outlet />
    </div>
  );
}
