import { ForgeMark } from "@/components/Logo";

// CareerForge signature loader: a spinning teal conic ring around the pulsing forge spark.
// Use <Loader/> inline; use <PageLoader/> to fill a section/page while data loads.

const SIZES = {
  sm: { box: 28, mark: 13, thick: 3 },
  md: { box: 48, mark: 20, thick: 4 },
  lg: { box: 72, mark: 30, thick: 5 },
};

export function Loader({ size = "md", className = "" }) {
  const s = SIZES[size] || SIZES.md;
  const ringMask = `radial-gradient(farthest-side, transparent calc(100% - ${s.thick}px), #000 calc(100% - ${s.thick}px))`;

  return (
    <div className={`relative ${className}`} style={{ width: s.box, height: s.box }}>
      {/* Spinning gradient ring */}
      <div
        className="absolute inset-0 rounded-full animate-spin"
        style={{
          background: "conic-gradient(from 90deg, transparent 0deg, rgba(20,184,166,0.15) 90deg, #14B8A6 300deg, #2DD4BF 360deg)",
          WebkitMask: ringMask,
          mask: ringMask,
          animationDuration: "0.9s",
        }}
      />
      {/* Pulsing brand spark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <ForgeMark size={s.mark} rounded={false} className="animate-pulse" />
      </div>
    </div>
  );
}

export function PageLoader({ label = "Loading…", className = "" }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 py-20 ${className}`}>
      <Loader size="lg" />
      {label && <p className="text-sm font-medium text-gray-500">{label}</p>}
    </div>
  );
}

export default Loader;
