// CareerForge brand mark + wordmark.
// <ForgeMark/> mirrors /public/favicon.svg so the tab icon and in-app logo are identical.

export function ForgeMark({ size = 34, rounded = true, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cfTileLogo" x1="16" y1="0" x2="16" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#16324A" />
          <stop offset="0.55" stopColor="#0B1220" />
          <stop offset="1" stopColor="#0B1220" />
        </linearGradient>
        <linearGradient id="cfSparkLogo" x1="6" y1="6" x2="22" y2="27" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5EEAD4" />
          <stop offset="0.5" stopColor="#2DD4BF" />
          <stop offset="1" stopColor="#14B8A6" />
        </linearGradient>
        <radialGradient id="cfGlowLogo" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#2DD4BF" stopOpacity="0.5" />
          <stop offset="1" stopColor="#2DD4BF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {rounded && (
        <>
          <rect width="32" height="32" rx="8" fill="url(#cfTileLogo)" />
          <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="none" stroke="#ffffff" strokeOpacity="0.08" />
        </>
      )}

      <circle cx="14.5" cy="16.5" r="9" fill="url(#cfGlowLogo)" />
      <path
        d="M14.5 5 C 15.4 13.2 18 15.8 26 16.5 C 18 17.2 15.4 19.8 14.5 28 C 13.6 19.8 11 17.2 3 16.5 C 11 15.8 13.6 13.2 14.5 5 Z"
        fill="url(#cfSparkLogo)"
      />
      <path
        d="M24 5 C 24.4 8 25 8.6 28 9 C 25 9.4 24.4 10 24 13 C 23.6 10 23 9.4 20 9 C 23 8.6 23.6 8 24 5 Z"
        fill="#F5C97B"
      />
    </svg>
  );
}

export default function Logo({
  showText = true,
  size = 34,
  className = "",
  textClassName = "text-brand-ink",
}) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <ForgeMark size={size} />
      {showText && (
        <span className={`font-display font-semibold text-xl tracking-tight leading-none ${textClassName}`}>
          Career<span className="text-brand-primary">Forge</span>
        </span>
      )}
    </div>
  );
}
