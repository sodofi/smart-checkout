"use client";

import { DaimoPayButton } from "@daimo/pay";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { normalize } from "viem/ens";
import { useEnsAddress } from "wagmi";
import { PoweredByPayFooter } from "@/components/powered-by-footer";
import { arbitrumUSDC, baseUSDC, celoUSDC, optimismUSDC, polygonUSDC, worldchainUSDC } from "@daimo/pay-common";
import Image from "next/image";
import confetti from "canvas-confetti";

function SendPageContent() {
  const searchParams = useSearchParams();
  
  // Get URL parameters
  const address = searchParams.get('a'); // recipient address or ENS
  const chainId = searchParams.get('c'); // chain ID
  const product = searchParams.get('n'); // product name
  const mode = searchParams.get('m') || searchParams.get('color') || 'black'; // theme color
  const imageUrl = searchParams.get('img') || searchParams.get('image') || undefined; // optional product image

  // Check if address is an ENS name
  const isENS = address && (address.endsWith('.eth') || address.endsWith('.xyz') || address.endsWith('.com') || address.includes('.'));
  
  // Product name
  const productName = product || null;

  // Celo brand color schemes - bold, high contrast
  const colorSchemes = {
    black: {
      background: '#000000', // Pure black
      text: '#FCFF52', // Celo yellow
      textSecondary: '#E6E3D5', // Celo tan
      accent: '#1A0329', // Celo purple
      button: '#FCFF52', // Yellow button
      buttonHover: '#000000', // Invert to black
      buttonText: '#000000', // Black text on yellow
      buttonTextHover: '#FCFF52' // Yellow text on black
    },
    green: {
      background: '#4E632A', // Celo forest green
      text: '#FCFF52', // Celo yellow
      textSecondary: '#FBF6F1', // Light tan
      accent: '#1A0329', // Celo purple
      button: '#FCFF52', // Yellow button
      buttonHover: '#4E632A', // Invert to green
      buttonText: '#4E632A', // Green text on yellow
      buttonTextHover: '#FCFF52' // Yellow text on green
    },
    blue: {
      background: '#1A0329', // Celo purple
      text: '#8AC0F9', // Light blue accent
      textSecondary: '#FBF6F1', // Light tan
      accent: '#4E632A', // Forest green
      button: '#8AC0F9', // Light blue button
      buttonHover: '#1A0329', // Invert to purple
      buttonText: '#1A0329', // Purple text on blue
      buttonTextHover: '#8AC0F9' // Blue text on purple
    },
    white: {
      background: '#FFFFFF', // Pure white
      text: '#1A0329', // Celo purple
      textSecondary: '#635949', // Brown
      accent: '#FCFF52', // Celo yellow
      button: '#1A0329', // Purple button
      buttonHover: '#FFFFFF', // Invert to white
      buttonText: '#FFFFFF', // White text on purple
      buttonTextHover: '#1A0329' // Purple text on white
    }
  };

  const colors = colorSchemes[mode as keyof typeof colorSchemes] || colorSchemes.black;

  // Resolve ENS to actual address
  const { data: resolvedAddress, isLoading: isResolvingENS } = useEnsAddress({
    name: isENS ? normalize(address) : undefined,
    // ENS registry + Universal Resolver live on Ethereum mainnet.
    // Using mainnet ensures both on-chain & CCIP-read names resolve.
    chainId: 1,
  });

  // Use resolved address if available, otherwise use original address
  const finalAddress = isENS && resolvedAddress ? resolvedAddress : address;

  // Validate required parameters (chain is optional; defaults to Celo)
  if (!address || !productName) {
    return (
      <div className="min-h-screen flex items-center justify-center color-block" style={{ backgroundColor: colors.background }}>
        <div className="max-w-2xl mx-auto p-12">
          <h1 className="headline-architectural text-6xl md:text-8xl font-thin mb-8" style={{ color: colors.text }}>
            MISSING
          </h1>
          <h2 className="headline-architectural text-3xl md:text-5xl font-thin headline-emphasis mb-12" style={{ color: colors.text }}>
            parameters
          </h2>
          
          <div className="sharp-rect p-8 color-block" style={{ 
            backgroundColor: colors.accent, 
            borderColor: colors.text,
            borderWidth: '3px'
          }}>
            <p className="body-industrial text-lg mb-6" style={{ color: colors.textSecondary }}>
              REQUIRED URL PARAMETERS:
            </p>
            <ul className="body-industrial space-y-3" style={{ color: colors.textSecondary }}>
              <li className="flex items-center gap-3">
                <span className="label-heavy text-xs px-2 py-1 sharp-rect" style={{ backgroundColor: colors.text, color: colors.background }}>A</span>
                recipient (address or ENS)
              </li>
              <li className="flex items-center gap-3">
                <span className="label-heavy text-xs px-2 py-1 sharp-rect" style={{ backgroundColor: colors.text, color: colors.background }}>N</span>
                product name
              </li>
              <li className="flex items-center gap-3">
                <span className="label-heavy text-xs px-2 py-1 sharp-rect" style={{ backgroundColor: colors.textSecondary, color: colors.background }}>C</span>
                optional chain ID (defaults to Celo)
              </li>
              <li className="flex items-center gap-3">
                <span className="label-heavy text-xs px-2 py-1 sharp-rect" style={{ backgroundColor: colors.textSecondary, color: colors.background }}>M</span>
                theme (black, green, blue, white)
              </li>
              <li className="flex items-center gap-3">
                <span className="label-heavy text-xs px-2 py-1 sharp-rect" style={{ backgroundColor: colors.textSecondary, color: colors.background }}>IMG</span>
                optional product image URL
              </li>
            </ul>
            
            <div className="mt-8 p-4 sharp-rect" style={{ backgroundColor: colors.background, borderColor: colors.textSecondary, borderWidth: '2px' }}>
              <p className="body-industrial text-sm" style={{ color: colors.textSecondary }}>
                EXAMPLE: ?a=merchant.eth&n=Hoodie&color=green&image=/green.webp
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show loading while resolving ENS
  if (isENS && isResolvingENS) {
    return (
      <div className="min-h-screen flex items-center justify-center color-block" style={{ backgroundColor: colors.background }}>
        <div className="text-center">
          <h1 className="headline-architectural text-4xl md:text-6xl font-thin mb-8" style={{ color: colors.text }}>
            RESOLVING
          </h1>
          <div className="w-16 h-16 sharp-rect mx-auto" style={{ 
            backgroundColor: colors.accent,
            borderColor: colors.text,
            borderWidth: '3px',
            animation: 'pulse 2s infinite'
          }}></div>
        </div>
      </div>
    );
  }

  // Check if ENS resolution failed
  if (isENS && !isResolvingENS && !resolvedAddress) {
    return (
      <div className="min-h-screen flex items-center justify-center color-block" style={{ backgroundColor: colors.background }}>
        <div className="max-w-xl mx-auto p-12 text-center">
          <h1 className="headline-architectural text-5xl md:text-7xl font-thin mb-8" style={{ color: colors.text }}>
            FAILED
          </h1>
          <div className="sharp-rect p-8 color-block" style={{ 
            backgroundColor: colors.accent, 
            borderColor: colors.text,
            borderWidth: '3px'
          }}>
            <p className="body-industrial text-lg" style={{ color: colors.textSecondary }}>
              COULD NOT RESOLVE ENS NAME:
            </p>
            <p className="label-heavy text-xl mt-4" style={{ color: colors.text }}>
              {address}
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  // Normalize chain id to number, default to Celo (42220)
  const defaultCeloChainId = 42220;
  const chainIdNumber = (() => {
    if (!chainId) return defaultCeloChainId;
    const parsed = parseInt(chainId, 10);
    return Number.isNaN(parsed) ? defaultCeloChainId : parsed;
  })();

  // USDC token addresses for common chains
  const USDC_ADDRESSES = {
    10: optimismUSDC, // Optimism USDC
    137: polygonUSDC, // Polygon USDC
    42161: arbitrumUSDC, // Arbitrum USDC
    8453: baseUSDC, // Base USDC
    480: worldchainUSDC, // Worldchain USDC
    42220: celoUSDC, // Celo USDC
  };

  const usdcToken = USDC_ADDRESSES[chainIdNumber as keyof typeof USDC_ADDRESSES];
  const usdcAddress = usdcToken?.token || "0x0000000000000000000000000000000000000000";

  return (
    <div 
      className="min-h-screen relative color-block" 
      style={{ 
        backgroundColor: colors.background
      }}
    >
      {/* Large architectural color blocks */}
      <div 
        className="absolute top-0 right-0 w-1/3 h-2/5 color-block"
        style={{ backgroundColor: colors.accent }}
      />
      <div 
        className="absolute bottom-0 left-0 w-1/4 h-1/3 color-block"
        style={{ backgroundColor: colors.textSecondary }}
      />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Main content area */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-2xl mx-auto">
            {/* Oversized architectural headline */}
            <div className="mb-16">
              <h1 
                className="headline-architectural text-6xl md:text-8xl lg:text-9xl font-thin leading-none mb-4"
                style={{ color: colors.text }}
              >
                SMART
              </h1>
              <h2 
                className="headline-architectural text-4xl md:text-6xl lg:text-7xl font-thin leading-none headline-emphasis"
                style={{ color: colors.text }}
              >
                checkout
              </h2>
            </div>

            {/* Product display - sharp rectangular design */}
            <div className="mb-16 flex justify-center">
              <div className="relative">
                {/* Sharp rectangular frame */}
                <div 
                  className="w-64 h-64 md:w-80 md:h-80 sharp-rect color-block"
                  style={{
                    backgroundColor: colors.accent,
                    borderColor: colors.text,
                    borderWidth: '4px'
                  }}
                >
                  {imageUrl && imageUrl.startsWith('http') ? (
                    <img
                      src={imageUrl}
                      alt={productName || 'Product'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image 
                      src={imageUrl || (mode === 'green' ? '/green.webp' : mode === 'blue' ? '/blue.webp' : mode === 'white' ? '/white.webp' : '/black.webp')}
                      alt={productName || 'Product'}
                      width={320}
                      height={320}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                
                {/* Product name as industrial label */}
                <div 
                  className="absolute -bottom-4 -right-4 px-6 py-3 sharp-rect color-block"
                  style={{
                    backgroundColor: colors.button,
                    borderColor: colors.background,
                    borderWidth: '3px'
                  }}
                >
                  <span 
                    className="label-heavy text-sm"
                    style={{ color: colors.buttonText }}
                  >
                    {productName}
                  </span>
                </div>
              </div>
            </div>
            {/* Industrial signage style description */}
            <div className="mb-16 text-center">
              <p 
                className="body-industrial text-2xl md:text-3xl font-medium tracking-tight"
                style={{ color: colors.textSecondary }}
              >
                PURCHASE READY
              </p>
            </div>

            {/* Sharp rectangular purchase button - bold and industrial */}
            <DaimoPayButton.Custom
              // For Celo builders: request an APP_ID by contacting Sophia (devrel) — see
              // https://github.com/sodofi or email sophia.dew@celo.org to obtain a key.
              appId={process.env.NEXT_PUBLIC_DAIMO_APP_ID!}
              intent={`Purchase ${productName}`}
              toChain={chainIdNumber}
              toAddress={finalAddress as `0x${string}`}
              toToken={usdcAddress as `0x${string}`}
              // No toUnits specified = deposit mode (user can choose amount)
              closeOnSuccess={true}
              resetOnSuccess={true}
              onPaymentCompleted={(payment) => {
                console.log('Payment completed:', payment);
                // Celebrate with Celo brand colors
                confetti({
                  particleCount: 100,
                  spread: 70,
                  origin: { y: 0.6 },
                  colors: ['#FCFF52', '#4E632A', '#1A0329', '#F2A9E7', '#8AC0F9']
                });
                setTimeout(() => {
                  confetti({
                    particleCount: 50,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#FCFF52', '#4E632A', '#1A0329']
                  });
                }, 200);
                setTimeout(() => {
                  confetti({
                    particleCount: 50,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#FCFF52', '#4E632A', '#1A0329']
                  });
                }, 400);
              }}
              onPaymentStarted={(payment) => {
                console.log('Payment started:', payment);
              }}
            >
              {({ show }: { show: () => void }) => (
                <button
                  onClick={show}
                  className="w-full md:w-auto px-16 py-8 sharp-rect color-block invert-hover"
                  style={{ 
                    backgroundColor: colors.button,
                    borderColor: colors.background,
                    borderWidth: '4px',
                    color: colors.buttonText
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.buttonHover;
                    e.currentTarget.style.color = colors.buttonTextHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.button;
                    e.currentTarget.style.color = colors.buttonText;
                  }}
                >
                  <span className="label-heavy text-xl tracking-wider">
                    PURCHASE NOW
                  </span>
                </button>
              )}
            </DaimoPayButton.Custom>
          </div>
        </div>
        
        {/* Footer with industrial design */}
        <div className="p-8">
          <PoweredByPayFooter 
            textColor={colors.textSecondary}
            hoverColor={colors.text}
          />
        </div>
      </div>
    </div>
  );
}

export default function SendPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center color-block" style={{ backgroundColor: '#000000' }}>
        <div className="text-center">
          <h1 className="headline-architectural text-4xl md:text-6xl font-thin mb-8" style={{ color: '#FCFF52' }}>
            LOADING
          </h1>
          <div className="w-16 h-16 sharp-rect mx-auto" style={{ 
            backgroundColor: '#1A0329',
            borderColor: '#FCFF52',
            borderWidth: '3px',
            animation: 'pulse 2s infinite'
          }}></div>
        </div>
      </div>
    }>
      <SendPageContent />
    </Suspense>
  );
}
