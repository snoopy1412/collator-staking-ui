'use client';

import * as React from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { NextUIProvider } from '@nextui-org/react';

import { config } from '@/config/wagmi';

import { AppProvider } from './app-provider';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000
    }
  }
});

export function DAppProvider({ children }: React.PropsWithChildren<unknown>) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <AppProvider>{children}</AppProvider>
        </NextUIProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
