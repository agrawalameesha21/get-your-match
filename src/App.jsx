import { useState, useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

import Landing from "./components/Landing";
import Quiz from "./components/Quiz";
import Results from "./components/Results";

import "@solana/wallet-adapter-react-ui/styles.css";

const STAGES = { landing: "landing", quiz: "quiz", results: "results" };

export default function App() {
  const [stage, setStage] = useState(STAGES.landing);
  const [scores, setScores] = useState(null);

  const endpoint = useMemo(() => clusterApiUrl("devnet"), []);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>
          {stage === STAGES.landing && (
            <Landing onStart={() => setStage(STAGES.quiz)} />
          )}
          {stage === STAGES.quiz && (
            <Quiz
              onComplete={(s) => {
                setScores(s);
                setStage(STAGES.results);
              }}
            />
          )}
          {stage === STAGES.results && scores && (
            <Results
              scores={scores}
              onRetry={() => {
                setScores(null);
                setStage(STAGES.landing);
              }}
            />
          )}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
