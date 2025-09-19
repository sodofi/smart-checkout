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
  const mode = searchParams.get('m') || searchParams.get('color') || 'white'; // theme color
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
      buttonHover: '#FCFF52', // Invert to yellow for better contrast
      buttonText: '#FFFFFF', // White text on purple
      buttonTextHover: '#1A0329' // Purple text on yellow
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
      <div className="min-h-screen flex items-center justify-center color-block p-3 sm:p-4 md:p-6" style={{ backgroundColor: colors.background }}>
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 text-center">
          <h1 className="headline-architectural text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin mb-3 sm:mb-4 md:mb-6" style={{ color: colors.text }}>
            MISSING
          </h1>
          <h2 className="headline-architectural text-xl sm:text-2xl md:text-3xl lg:text-4xl font-thin headline-emphasis mb-6 sm:mb-8 md:mb-10" style={{ color: colors.text }}>
            parameters
          </h2>
          
          <div className="sharp-rect p-4 sm:p-6 md:p-8 lg:p-10 color-block max-w-4xl mx-auto" style={{ 
            backgroundColor: colors.accent, 
            borderColor: colors.text,
            borderWidth: '3px'
          }}>
            <p className="body-industrial text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-6" style={{ color: colors.textSecondary }}>
              REQUIRED URL PARAMETERS:
            </p>
            <ul className="body-industrial space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg" style={{ color: colors.textSecondary }}>
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
      <div className="min-h-screen flex items-center justify-center color-block p-3 sm:p-4 md:p-6" style={{ backgroundColor: colors.background }}>
        <div className="text-center w-full px-4 sm:px-6 md:px-8">
          <h1 className="headline-architectural text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin mb-6 sm:mb-8 md:mb-10" style={{ color: colors.text }}>
            RESOLVING
          </h1>
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 sharp-rect mx-auto" style={{ 
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
      <div className="min-h-screen flex items-center justify-center color-block p-3 sm:p-4 md:p-6" style={{ backgroundColor: colors.background }}>
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 text-center">
          <h1 className="headline-architectural text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-thin mb-6 sm:mb-8 md:mb-10" style={{ color: colors.text }}>
            FAILED
          </h1>
          <div className="sharp-rect p-6 sm:p-8 md:p-10 color-block max-w-4xl mx-auto" style={{ 
            backgroundColor: colors.accent, 
            borderColor: colors.text,
            borderWidth: '3px'
          }}>
            <p className="body-industrial text-base sm:text-lg md:text-xl mb-4 sm:mb-6" style={{ color: colors.textSecondary }}>
              COULD NOT RESOLVE ENS NAME:
            </p>
            <p className="label-heavy text-lg sm:text-xl md:text-2xl mt-4 sm:mt-6 break-all" style={{ color: colors.text }}>
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
      {/* Full-screen architectural color blocks */}
      <div 
        className="absolute top-0 right-0 w-1/3 sm:w-2/5 md:w-1/2 h-1/3 sm:h-2/5 md:h-1/2 color-block opacity-20"
        style={{ backgroundColor: colors.accent }}
      />
      <div 
        className="absolute bottom-0 left-0 w-1/4 sm:w-1/3 md:w-2/5 h-1/4 sm:h-1/3 md:h-2/5 color-block opacity-15"
        style={{ backgroundColor: colors.textSecondary }}
      />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Main content area - full screen utilization */}
        <div className="flex-1 flex items-center justify-center p-3 sm:p-4 md:p-6">
          <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 text-center">
            {/* Full-width architectural headline */}
            <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
              <h1 
                className="headline-architectural text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-thin leading-none mb-2 sm:mb-3 md:mb-4"
                style={{ color: colors.text }}
              >
                TIPS
              </h1>
              <h2 
                className="headline-architectural text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-thin leading-tight headline-emphasis"
                style={{ color: colors.text }}
              >
                Tip your coffee barista
              </h2>
            </div>

            {/* Product display - larger and more prominent */}
            <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 flex justify-center">
              <div className="relative">
                {/* Sharp rectangular frame - larger sizing */}
                <div 
                  className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 sharp-rect color-block mx-auto"
                  style={{
                    backgroundColor: colors.accent,
                    borderColor: colors.text,
                    borderWidth: '3px'
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
                      width={256}
                      height={256}
                      className="w-full h-full object-cover"
                      priority
                    />
                  )}
                </div>
                
                {/* Product name as industrial label - responsive */}
                {/* <div 
                  className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 px-3 sm:px-6 py-2 sm:py-3 sharp-rect color-block"
                  style={{
                    backgroundColor: colors.button,
                    borderColor: colors.background,
                    borderWidth: '2px'
                  }}
                >
                  <span 
                    className="label-heavy text-xs sm:text-sm"
                    style={{ color: colors.buttonText }}
                  >
                    {productName}
                  </span>
                </div> */}
              </div>
            </div>
            {/* Industrial signage style description - responsive */}
            {/* <div className="mb-8 sm:mb-12 lg:mb-16 text-center">
              <p 
                className="body-industrial text-lg sm:text-2xl md:text-3xl font-medium tracking-tight"
                style={{ color: colors.textSecondary }}
              >
                TIP READY
              </p>
            </div> */}

            {/* Sharp rectangular tip button - prominent and centered */}
            <div className="flex justify-center mt-4 sm:mt-6 md:mt-8">
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
                    className="px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 py-4 sm:py-5 md:py-6 lg:py-7 sharp-rect color-block invert-hover mx-auto"
                    style={{ 
                      backgroundColor: colors.button,
                      borderColor: colors.text,
                      borderWidth: '3px',
                      color: colors.buttonText
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.buttonHover;
                      e.currentTarget.style.color = colors.buttonTextHover;
                      e.currentTarget.style.borderColor = colors.buttonTextHover;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colors.button;
                      e.currentTarget.style.color = colors.buttonText;
                      e.currentTarget.style.borderColor = colors.text;
                    }}
                  >
                    <span className="label-heavy text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl tracking-wider">
                      TIP
                    </span>
                  </button>
                )}
              </DaimoPayButton.Custom>
            </div>
          </div>
        </div>
        
        {/* Footer with industrial design - full width */}
        <div className="mt-auto pt-6 pb-6 sm:pb-8 md:pb-10">
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
      <div className="min-h-screen flex items-center justify-center color-block p-3 sm:p-4 md:p-6" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="text-center w-full px-4 sm:px-6 md:px-8">
          <h1 className="headline-architectural text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin mb-6 sm:mb-8 md:mb-10" style={{ color: '#1A0329' }}>
            LOADING
          </h1>
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 sharp-rect mx-auto" style={{ 
            backgroundColor: '#FCFF52',
            borderColor: '#1A0329',
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
