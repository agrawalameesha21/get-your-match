export default function Landing({ onStart }) {
  return (
    <div className="min-h-screen stadium-bg flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      {/* Stadium lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-green-900/20 rounded-full blur-2xl pointer-events-none" />

      {/* Trophy / ball icon */}
      <div className="text-7xl mb-6 animate-fade-up" style={{ animationDelay: "0s" }}>⚽</div>

      <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <p className="text-yellow-400 text-sm font-semibold tracking-[0.25em] uppercase mb-3">
          FIFA World Cup Edition
        </p>
        <h1
          className="font-display text-5xl sm:text-7xl font-bold leading-tight mb-2"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          <span className="shimmer-text">WORLD CUP</span>
        </h1>
        <h1
          className="font-display text-5xl sm:text-7xl font-bold leading-tight mb-6 text-white"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          VIBE CHECK
        </h1>
      </div>

      <p
        className="text-gray-300 text-lg sm:text-xl max-w-md mb-10 leading-relaxed animate-fade-up"
        style={{ animationDelay: "0.2s" }}
      >
        6 questions. One iconic player. Mint your football personality as a Solana NFT.
      </p>

      <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
        <button
          onClick={onStart}
          className="group relative px-10 py-4 bg-yellow-400 text-black font-bold text-lg rounded-full cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-yellow-300 animate-pulse-glow"
          style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.05em" }}
        >
          <span className="relative z-10">FIND YOUR PLAYER VIBE →</span>
        </button>
      </div>

      <div className="mt-16 flex gap-6 flex-wrap justify-center animate-fade-up" style={{ animationDelay: "0.4s" }}>
        {["🇦🇷", "🇵🇹", "🇫🇷", "🇳🇴", "🇧🇷", "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "🇪🇸", "🇳🇱"].map((flag, i) => (
          <span key={i} className="text-3xl opacity-60 hover:opacity-100 transition-opacity">
            {flag}
          </span>
        ))}
      </div>

      <p className="mt-8 text-gray-600 text-xs animate-fade-up" style={{ animationDelay: "0.5s" }}>
        Mint on Solana Devnet · Powered by Metaplex
      </p>
    </div>
  );
}
