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
        className="text-sm transition-all duration-200"
        style={{ 
          color: textColor,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = hoverColor;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = textColor;
        }}
      >
        Powered by Daimo Pay
      </a>
    </div>
  );
} 