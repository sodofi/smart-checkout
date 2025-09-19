"use client";

import { useEffect, useState } from "react";

interface PoweredByPayFooterProps {
  textColor?: string;
  hoverColor?: string;
}

export function PoweredByPayFooter({
  textColor = "#6B7280", 
  hoverColor = "#374151" 
}: PoweredByPayFooterProps) {
  const [ref, setRef] = useState("footer");
  useEffect(() => {
    const { hostname, pathname } = window.location;
    setRef(`footer-${hostname + pathname}`);
  }, []);

  return (
    <div className="text-center">
      <a
        href={`https://pay.daimo.com?ref=${ref}`}
        target="_blank"
        className="body-industrial text-xs tracking-wider transition-all duration-200 inline-block px-3 py-1.5 sharp-rect"
        style={{ 
          color: textColor,
          borderColor: textColor,
          borderWidth: '1px',
          backgroundColor: 'transparent'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = hoverColor;
          e.currentTarget.style.borderColor = hoverColor;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = textColor;
          e.currentTarget.style.borderColor = textColor;
        }}
      >
        <span className="label-heavy">POWERED BY DAIMO PAY</span>
      </a>
    </div>
  );
} 