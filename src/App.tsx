import "./global.css";
import { RouterProvider } from "react-router-dom";

import { router } from "@/routes";
import { ThemeProvider } from "@/components/theme/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="teste-front-end-befly">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
