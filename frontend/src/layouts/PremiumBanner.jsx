const PremiumBanner = () => {
  return (
    <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-violet-600 to-purple-500 shadow-md">

      <div className="flex flex-wrap items-center justify-between px-6 py-3 text-sm text-white">

        <p className="font-medium">
          🚀 Unlock Premium AI Resume Features & Unlimited Credits
        </p>

        <button
          className="
            flex items-center gap-2
            px-4 py-2
            rounded-lg
            bg-white text-violet-700
            hover:bg-gray-100
            transition
            active:scale-95
            font-semibold
          "
        >
          Explore Premium

          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M2.91797 7H11.0846"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M7 2.9165L11.0833 6.99984L7 11.0832"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

      </div>
    </div>
  );
};

export default PremiumBanner;