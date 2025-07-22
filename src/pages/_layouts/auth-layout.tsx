import { Outlet } from "react-router-dom";
export function AuthLayout() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Outlet />
    </div>
  );
}
