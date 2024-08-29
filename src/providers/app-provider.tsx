"use client";
import { Toaster } from "sonner";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Spinner } from "@nextui-org/react";

import { APP_NAME, DEFAULT_THEME } from "@/config/site";
import { useRainbowKitTheme } from "@/hooks/useRainbowKitTheme";
import useMounted from "@/hooks/useMounted";
import useTheme from "@/hooks/useTheme";

import type { ReactNode } from "react";

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const isMounted = useMounted();
  const rainbowKitTheme = useRainbowKitTheme();
  const { theme } = useTheme();

  return isMounted ? (
    <RainbowKitProvider
      theme={rainbowKitTheme}
      locale="en-US"
      appInfo={{ appName: APP_NAME }}
    >
      {children}
      <Toaster
        richColors
        theme={(theme as "dark" | "light" | "system") || DEFAULT_THEME}
        position="top-center"
      />
    </RainbowKitProvider>
  ) : (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner />
    </div>
  );
};
