import React from "react";
import { motion } from "framer-motion";

/**
 * Props:
 *  - proxyRows: ReactNode[]  (array of rows to render inside proxy)
 *  - children: visible pill content (icons etc)
 */
export default function LiquidPill({ proxyRows, children }: { proxyRows: React.ReactNode[]; children: React.ReactNode }) {
  return (
    <div className="relative flex justify-center w-full">
      {/* The pill itself */}
      <div className="liquid-pill mx-auto">
        {/* Proxy (clipped refraction layer) */}
        <div className="liquid-pill__proxy" aria-hidden>
          <div className="liquid-pill__proxyInner">
            {/* Center the three rows like the outer scene uses */}
            <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>
              {proxyRows.map((r, i) => (
                <div key={i} style={{ width: "min(100%,1100px)", margin: "6px 0" }}>{r}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Shine & caustics */}
        <div className="liquid-pill__shine" />

        {/* Foreground content */}
        <div className="liquid-pill__content">
          {children}
        </div>
      </div>
    </div>
  );
}
