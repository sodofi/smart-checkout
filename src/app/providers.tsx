"use client";
import { DaimoPayProvider, getDefaultConfig } from "@daimo/pay";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { WagmiProvider, createConfig } from "wagmi";

const wagmiConfig = createConfig(
  getDefaultConfig({
    appName: "Smart Checkout",
  }),
);

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <DaimoPayProvider>
          {children}
        </DaimoPayProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}