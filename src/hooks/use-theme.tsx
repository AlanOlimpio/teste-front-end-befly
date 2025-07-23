import ThemeProviderContext from "@/components/theme/theme-provider";
import { useContext } from "react";

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme deve ser usado dentro de um AuthProvider");

  return context;
};