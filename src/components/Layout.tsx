import { Outlet } from "react-router";

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex-1 p-8 px-14">
        <Outlet />
      </main>
    </div>
  );
}
