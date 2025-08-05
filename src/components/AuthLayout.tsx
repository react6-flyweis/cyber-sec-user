import { Outlet } from "react-router";
import { Toaster } from "sonner";

export function AuthLayout() {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-primary/20">
      <div className="w-full max-w-xl">
        <Outlet />
      </div>
      <Toaster />
    </main>
  );
}
