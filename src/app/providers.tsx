"use client";
import { DaimoPayProvider, getDefaultConfig } from "@daimo/pay";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { WagmiProvider, createConfig } from "wagmi";

const wagmiConfig = createConfig(
  getDefaultConfig({
    appName: "Cap Daimo Pay",
  }),
);

const queryClient = new QueryClient();

const payApiUrl = "https://pay-api.daimo.xyz/";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <DaimoPayProvider payApiUrl={payApiUrl}>
          {children}
        </DaimoPayProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}