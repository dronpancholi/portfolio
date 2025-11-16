import React from "react";

export function QualityDebug() {
  const onSet = (q:string) => {
    const el = document.querySelector(".liquid-pill__proxyInner") as HTMLElement|null;

    if(q==="high"){ 
      document.documentElement.style.setProperty("--liquid-displace-scale","6");
      document.documentElement.style.setProperty("--glass-blur", "22px");
      document.documentElement.style.setProperty("--glass-shine-opacity", "0.9");
      if (el) el.style.filter = "url(#liquidRefraction)";
    }
    if(q==="mid"){
      document.documentElement.style.setProperty("--liquid-displace-scale","3");
      document.documentElement.style.setProperty("--glass-blur", "16px");
      document.documentElement.style.setProperty("--glass-shine-opacity", "0.65");
      if (el) el.style.filter = "none";
    }
    if(q==="low"){
      document.documentElement.style.setProperty("--liquid-displace-scale","0");
      document.documentElement.style.setProperty("--glass-blur", "10px");
      document.documentElement.style.setProperty("--glass-shine-opacity", "0.45");
      if (el) el.style.filter = "none";
    }
  };
  
  return (
    <div style={{ position:"fixed", right:12, bottom:12, zIndex:9999, background: 'rgba(255,255,255,0.8)', padding: '8px', borderRadius: '8px', display: 'flex', gap: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <button onClick={()=>onSet("high")} style={{padding: '4px 8px', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer'}}>High</button>
      <button onClick={()=>onSet("mid")} style={{padding: '4px 8px', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer'}}>Mid</button>
      <button onClick={()=>onSet("low")} style={{padding: '4px 8px', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer'}}>Low</button>
    </div>
  );
}
