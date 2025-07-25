import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "@/pages/_layouts/app-layout";
import { AuthLayout } from "@/pages/_layouts/auth-layout";
import { Dashboard } from "@/pages/app/dashboard";
import { SignIn } from "@/pages/auth/sign-in";
import RequireAuth from "@/components/require-auth";
import { HotelDetail } from "@/pages/app/hotel-detail";
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/hotel/:place_id",
        element: <HotelDetail />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
]);
