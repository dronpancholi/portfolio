import React, { useEffect, useMemo, useRef } from "react";

type Props = {
  proxyRows: React.ReactNode[]; // 3 rows
  children: React.ReactNode;
};

function usePauseWhenHidden(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    let obs: IntersectionObserver | null = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          // pause CSS animations / set play-state
          const play = en.isIntersecting;
          // control tickers outside the pill
          document.querySelectorAll(".ticker-rail").forEach((r) => {
            // use style to control
            (r as HTMLElement).style.animationPlayState = play ? "running" : "paused";
          });
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => { obs?.disconnect(); };
  }, [ref]);
}

const LiquidPillInner: React.FC<Props> = ({ proxyRows, children }) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  usePauseWhenHidden(rootRef);

  // ensure conservative DOM for proxy rows to avoid reflow
  const rows = useMemo(() => proxyRows.map((r, i) => <div key={i} style={{ width: "min(100%,1100px)", margin: "6px 0" }}>{r}</div>), [proxyRows]);

  return (
    <div ref={rootRef} className="relative flex justify-center w-full">
      <div className="liquid-pill mx-auto" role="list" aria-label="Social links">
        <div className="liquid-pill__proxy" aria-hidden>
          <div className="liquid-pill__proxyInner">
            <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>
              {rows}
            </div>
          </div>
        </div>

        <div className="liquid-pill__depth" aria-hidden />
        <div className="liquid-pill__shine" aria-hidden />

        <div className="liquid-pill__content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default React.memo(LiquidPillInner);