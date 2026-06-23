import { useEffect, useState } from "react";

export default function WelcomeSplash({ onDone }) {
  const [hiding, setHiding] = useState(false);

  const getName = () => localStorage.getItem("userName") || "Traveller";

  useEffect(() => {
    const hideTimer = setTimeout(() => setHiding(true), 2400);
    const doneTimer = setTimeout(() => onDone(), 3000);
    return () => { clearTimeout(hideTimer); clearTimeout(doneTimer); };
  }, [onDone]);

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "#7b0325",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 12,
      opacity: hiding ? 0 : 1,
      transition: "opacity 0.6s ease",
      zIndex: 9999,
    }}>
      <span style={{ fontSize: 60 }}>✈</span>
      <p style={{ fontSize: 13, letterSpacing: "0.12em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", margin: "0 0 8px", fontFamily: "sans-serif" }}>
  Welcome to Trip Planner
</p>
<p style={{ fontSize: 42, fontWeight: 700, color: "#fff", margin: "0 0 6px", fontFamily: "sans-serif" }}>
  {getName()}
</p>
<p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", margin: 0, fontFamily: "sans-serif" }}>
  Ready for your next adventure?
</p>
      

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.15)" }}>
        <div style={{
          height: "100%", background: "rgba(255,255,255,0.6)",
          animation: "splashProgress 3s linear forwards",
        }} />
      </div>

      <style>{`@keyframes splashProgress { from { width: 0% } to { width: 100% } }`}</style>
    </div>
  );
}