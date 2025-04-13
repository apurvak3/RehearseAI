import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mt-4 mb-8">RehearseAI App</h1>
      <Outlet />
    </div>
  );
}