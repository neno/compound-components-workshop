import { NuqsAdapter } from "nuqs/adapters/react";
import { ThemeContextProvider } from "@/context/theme-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      <ThemeContextProvider>{children}</ThemeContextProvider>
    </NuqsAdapter>
  );
}
