import "./global.css";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import AuthContext, { AuthProvider } from "@/context/auth-provider";
import { useContext } from "react";

const AppContent = () => {
  const context = useContext(AuthContext);

  if (!context) return null;
  const { loading } = context;
  if (loading) return;

  return <RouterProvider router={router} />;
};

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="teste-front-end">
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <AppContent />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
