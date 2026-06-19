import { useEffect, useRef, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { players, matchPlayer, calcScore } from "../data/quiz";
import { drawPlayerCard, canvasToBlob } from "../utils/playerCard";
import { mintNFT } from "../utils/mintNFT";

export default function Results({ scores, onRetry }) {
  const playerKey = matchPlayer(scores);
  const player = players[playerKey];
  const score = calcScore(scores, playerKey);

  const canvasRef = useRef(null);
  const [mintState, setMintState] = useState("idle"); // idle | connecting | minting | success | error
  const [txSig, setTxSig] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const { connected, publicKey, wallet } = useWallet();

  useEffect(() => {
    if (canvasRef.current) {
      drawPlayerCard(canvasRef.current, player, score);
    }
  }, [player, score]);

  async function handleMint() {
    if (!connected) {
      // Wallet button handles connect — this shouldn't be reached normally
      return;
    }
    setMintState("minting");
    setErrorMsg("");
    try {
      const blob = await canvasToBlob(canvasRef.current);
      const sig = await mintNFT({ player, score, imageBlob: blob, publicKey, wallet });
      setTxSig(sig);
      setMintState("success");
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Minting failed. Check console for details.");
      setMintState("error");
    }
  }

  const explorerUrl = txSig
    ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet`
    : null;

  return (
    <div className="min-h-screen stadium-bg flex flex-col items-center justify-start px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10 animate-fade-up">
        <p className="text-yellow-400 text-sm font-semibold tracking-[0.2em] uppercase mb-2">
          Your World Cup Vibe Is...
        </p>
        <h1
          className="text-4xl sm:text-6xl font-bold text-white leading-tight"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          {player.name.toUpperCase()}
        </h1>
        <div className="flex items-center justify-center gap-3 mt-3">
          <span className="text-4xl">{player.flag}</span>
          <span className="text-gray-400 font-medium">{player.country} · {player.position}</span>
        </div>
      </div>

      <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-8 items-center lg:items-start">
        {/* Player Card Canvas */}
        <div className="flex-shrink-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="relative">
            <div
              className="absolute inset-0 rounded-2xl blur-xl opacity-40"
              style={{ background: player.color }}
            />
            <canvas
              ref={canvasRef}
              width={280}
              height={400}
              className="relative rounded-2xl"
              style={{ boxShadow: `0 0 40px ${player.color}66` }}
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex-1 min-w-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          {/* Vibe title */}
          <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-4 py-1.5 mb-4">
            <span className="text-yellow-400 text-sm font-bold tracking-wide">"{player.vibeTitle}"</span>
          </div>

          {/* Compatibility score */}
          <div className="flex items-center gap-4 mb-6">
            <div className="text-6xl font-black" style={{ color: player.color, fontFamily: "'Oswald', sans-serif" }}>
              {score}%
            </div>
            <div>
              <div className="text-white font-semibold">{player.name.split(" ").pop()} Energy</div>
              <div className="w-40 h-2 bg-gray-800 rounded-full mt-1.5">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${score}%`, background: `linear-gradient(to right, ${player.color}, #eab308)` }}
                />
              </div>
            </div>
          </div>

          {/* Vibe description */}
          <div className="bg-gray-900/60 border border-gray-700/40 rounded-xl p-5 mb-6 backdrop-blur-sm">
            <p className="text-gray-200 text-base leading-relaxed">{player.description}</p>
          </div>

          {/* Dimension breakdown */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {[
              { key: "playmaker", label: "Playmaker", emoji: "🎯", color: "#60a5fa" },
              { key: "finisher", label: "Finisher", emoji: "⚡", color: "#f87171" },
              { key: "enforcer", label: "Enforcer", emoji: "🛡️", color: "#c084fc" },
              { key: "entertainer", label: "Entertainer", emoji: "🌟", color: "#fbbf24" },
            ].map(({ key, label, emoji, color }) => {
              const val = scores[key] || 0;
              const max = 12;
              const pct = Math.min(100, Math.round((val / max) * 100));
              return (
                <div key={key} className="bg-gray-900/40 rounded-lg p-3 border border-gray-800">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs text-gray-400 font-medium">{emoji} {label}</span>
                    <span className="text-xs font-bold" style={{ color }}>{pct}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mint section */}
          <div className="bg-gray-900/60 border border-gray-700/40 rounded-xl p-5 backdrop-blur-sm">
            <h3 className="text-white font-bold mb-1" style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.1rem" }}>
              MINT YOUR VIBE AS AN NFT
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Immortalise your football personality on Solana Devnet. Free to mint.
            </p>

            {mintState === "success" ? (
              <div className="text-center py-4">
                <div className="text-4xl mb-2">🏆</div>
                <p className="text-green-400 font-bold mb-3">NFT Minted Successfully!</p>
                <a
                  href={explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/40 rounded-lg px-4 py-2 text-green-400 text-sm font-medium hover:bg-green-500/20 transition-colors"
                >
                  View on Solana Explorer ↗
                </a>
              </div>
            ) : (
              <div className="space-y-3">
                {!connected ? (
                  <div className="flex flex-col items-start gap-3">
                    <p className="text-yellow-400/80 text-xs">Connect your Phantom wallet to mint</p>
                    <WalletMultiButton
                      style={{
                        background: "#eab308",
                        color: "black",
                        fontWeight: "bold",
                        borderRadius: "9999px",
                        padding: "10px 24px",
                        fontSize: "14px",
                        border: "none",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-green-400 text-sm">
                        {publicKey?.toBase58().slice(0, 8)}...{publicKey?.toBase58().slice(-4)} connected
                      </span>
                      <WalletMultiButton
                        style={{
                          background: "transparent",
                          color: "#9ca3af",
                          fontSize: "11px",
                          padding: "2px 8px",
                          border: "1px solid #374151",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                    <button
                      onClick={handleMint}
                      disabled={mintState === "minting"}
                      className="w-full py-3 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                      style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.05em" }}
                    >
                      {mintState === "minting" ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          MINTING ON DEVNET...
                        </span>
                      ) : "MINT MY VIBE AS NFT ⚽"}
                    </button>
                  </div>
                )}

                {mintState === "error" && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <p className="text-red-400 text-sm">{errorMsg}</p>
                    {errorMsg.includes("devnet SOL") && (
                      <a
                        href="https://faucet.solana.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-yellow-400 text-xs underline"
                      >
                        → Get free devnet SOL at faucet.solana.com ↗
                      </a>
                    )}
                    <button
                      onClick={() => setMintState("idle")}
                      className="block text-red-400 text-xs underline mt-2 cursor-pointer"
                    >
                      Try again
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Retry */}
      <button
        onClick={onRetry}
        className="mt-10 text-gray-500 text-sm hover:text-gray-300 transition-colors cursor-pointer underline"
      >
        Take the quiz again
      </button>
    </div>
  );
}
