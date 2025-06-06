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

const theme = {
  "--ck-font-family": "Inter",
  "--ck-font-weight": "400",
  "--ck-border-radius": "20px",
  "--ck-overlay-backdrop-filter": "blur(0px)",
  "--ck-modal-heading-font-weight": "500",
  "--ck-qr-border-radius": "16px",
  "--ck-connectbutton-font-size": "15px",
  "--ck-connectbutton-color": "#373737",
  "--ck-connectbutton-background": "#F6F7F9",
  "--ck-connectbutton-background-secondary": "#FFFFFF",
  "--ck-connectbutton-border-radius": "16px",
  "--ck-connectbutton-box-shadow": "0 0 0 0 #ffffff",
  "--ck-connectbutton-hover-color": "#373737",
  "--ck-connectbutton-hover-background": "#F0F2F5",
  "--ck-connectbutton-hover-box-shadow": "0 0 0 0 #ffffff",
  "--ck-connectbutton-active-color": "#373737",
  "--ck-connectbutton-active-background": "#EAECF1",
  "--ck-connectbutton-active-box-shadow": "0 0 0 0 #ffffff",
  "--ck-connectbutton-balance-color": "#373737",
  "--ck-connectbutton-balance-background": "#fff",
  "--ck-connectbutton-balance-box-shadow": "inset 0 0 0 1px #F6F7F9",
  "--ck-connectbutton-balance-hover-background": "#F6F7F9",
  "--ck-connectbutton-balance-hover-box-shadow": "inset 0 0 0 1px #F0F2F5",
  "--ck-connectbutton-balance-active-background": "#F0F2F5",
  "--ck-connectbutton-balance-active-box-shadow": "inset 0 0 0 1px #EAECF1",
  "--ck-primary-button-font-weight": "600",
  "--ck-primary-button-border-radius": "16px",
  "--ck-primary-button-color": "#ffffff",
  "--ck-primary-button-background": "#231C2A",
  "--ck-primary-button-box-shadow": "0 0 0 0 #ffffff",
  "--ck-primary-button-hover-color": "#ffffff",
  "--ck-primary-button-hover-background": "#40344b",
  "--ck-primary-button-hover-box-shadow": "0 0 0 0 #ffffff",
  "--ck-primary-button-active-color": "#373737",
  "--ck-primary-button-active-background": "#40344b",
  "--ck-primary-button-active-box-shadow": "0 0 0 0 #ffffff",
  "--ck-secondary-button-font-weight": "500",
  "--ck-secondary-button-border-radius": "16px",
  "--ck-secondary-button-color": "#ffffff",
  "--ck-secondary-button-background": "#7C65C1",
  "--ck-secondary-button-box-shadow": "0 0 0 0 #ffffff",
  "--ck-secondary-button-hover-color": "#373737",
  "--ck-secondary-button-hover-background": "#dfe4ec",
  "--ck-secondary-button-hover-box-shadow": "0 0 0 0 #ffffff",
  "--ck-secondary-button-active-color": "#373737",
  "--ck-secondary-button-active-background": "#dfe4ec",
  "--ck-secondary-button-active-box-shadow": "0 0 0 0 #ffffff",
  "--ck-tertiary-button-font-weight": "500",
  "--ck-tertiary-button-border-radius": "16px",
  "--ck-tertiary-button-color": "#e50d0d",
  "--ck-tertiary-button-background": "#F6F7F9",
  "--ck-tertiary-button-box-shadow": "0 0 0 0 #ffffff",
  "--ck-tertiary-button-hover-color": "#645353",
  "--ck-tertiary-button-hover-background": "#F6F7F9",
  "--ck-tertiary-button-hover-box-shadow": "0 0 0 0 #ffffff",
  "--ck-tertiary-button-active-color": "#373737",
  "--ck-tertiary-button-active-background": "#F6F7F9",
  "--ck-tertiary-button-active-box-shadow": "0 0 0 0 #ffffff",
  "--ck-modal-box-shadow": "0px 2px 4px 0px #00000005",
  "--ck-overlay-background": "#00000008",
  "--ck-body-color": "#ffffff",
  "--ck-body-color-muted": "#ffffff",
  "--ck-body-color-muted-hover": "#111111",
  "--ck-body-background": "#17101F",
  "--ck-body-background-transparent": "rgba(255,255,255,0)",
  "--ck-body-background-secondary": "#004eeb",
  "--ck-body-background-secondary-hover-background": "#e0e4eb",
  "--ck-body-background-secondary-hover-outline": "#4282FF",
  "--ck-body-background-tertiary": "#ffffff",
  "--ck-body-action-color": "#ffffff",
  "--ck-body-divider": "#7C65C1",
  "--ck-body-color-danger": "#FF4E4E",
  "--ck-body-color-valid": "#32D74B",
  "--ck-siwe-border": "#F0F0F0",
  "--ck-body-disclaimer-background": "#ffffff",
  "--ck-body-disclaimer-color": "#AAAAAB",
  "--ck-body-disclaimer-link-color": "#838485",
  "--ck-body-disclaimer-link-hover-color": "#d8d8d8",
  "--ck-tooltip-background": "#7C65C1",
  "--ck-tooltip-background-secondary": "#ffffff",
  "--ck-tooltip-color": "#ffffff",
  "--ck-tooltip-shadow": "0px 2px 10px 0 #00000014",
  "--ck-dropdown-button-color": "#999999",
  "--ck-dropdown-button-box-shadow":
    "0 0 0 1px rgba(0,0,0,0.01), 0px 0px 7px rgba(0, 0, 0, 0.05)",
  "--ck-dropdown-button-background": "#fff",
  "--ck-dropdown-button-hover-color": "#8B8B8B",
  "--ck-dropdown-button-hover-background": "#F5F7F9",
  "--ck-qr-dot-color": "#000000",
  "--ck-qr-background": "#ffffff",
  "--ck-qr-border-color": "#f7f6f8",
  "--ck-focus-color": "#7C65C1",
  "--ck-spinner-color": "#7C65C1",
  "--ck-copytoclipboard-stroke": "#CCCCCC",
  "--ck-recent-badge-color": "#ffffff",
  "--ck-recent-badge-background": "#f7f7f7",
  "--ck-recent-badge-border-radius": "32px",
};
