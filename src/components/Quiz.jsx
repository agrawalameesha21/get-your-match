import { useState, useEffect } from "react";
import { questions } from "../data/quiz";

export default function Quiz({ onComplete }) {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState({ playmaker: 0, finisher: 0, enforcer: 0, entertainer: 0 });
  const [selected, setSelected] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("right");

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  function handleSelect(option) {
    if (selected || animating) return;
    setSelected(option.label);

    // Accumulate dimension scores
    const newScores = { ...scores };
    Object.entries(option.dims).forEach(([dim, val]) => {
      newScores[dim] = (newScores[dim] || 0) + val;
    });

    setTimeout(() => {
      setAnimating(true);
      setTimeout(() => {
        if (current + 1 >= questions.length) {
          onComplete(newScores);
        } else {
          setScores(newScores);
          setCurrent((c) => c + 1);
          setSelected(null);
          setAnimating(false);
        }
      }, 350);
    }, 500);
  }

  return (
    <div className="min-h-screen stadium-bg flex flex-col items-center justify-center px-4 py-8">
      {/* Progress bar */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>Question {current + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-green-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dimension indicators */}
        <div className="flex gap-3 mt-3">
          {["playmaker", "finisher", "enforcer", "entertainer"].map((dim) => {
            const val = scores[dim] || 0;
            const maxPossible = 12;
            const pct = Math.min(100, (val / maxPossible) * 100);
            const colors = {
              playmaker: "bg-blue-400",
              finisher: "bg-red-400",
              enforcer: "bg-purple-400",
              entertainer: "bg-yellow-400",
            };
            return (
              <div key={dim} className="flex-1">
                <div className="text-[9px] text-gray-500 uppercase tracking-wider mb-1">{dim}</div>
                <div className="h-1 bg-gray-800 rounded-full">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${colors[dim]}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Question card */}
      <div
        key={current}
        className="w-full max-w-2xl animate-slide-in"
        style={{ opacity: animating ? 0 : 1, transition: "opacity 0.3s" }}
      >
        <div className="bg-gray-900/80 border border-gray-700/50 rounded-2xl p-6 sm:p-8 mb-6 backdrop-blur-sm">
          <p className="text-yellow-400 text-xs font-semibold tracking-widest uppercase mb-4">
            Scenario {current + 1}
          </p>
          <h2
            className="text-white text-xl sm:text-2xl font-bold leading-snug"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            {q.text}
          </h2>
        </div>

        <div className="grid gap-3">
          {q.options.map((opt) => {
            const isSelected = selected === opt.label;
            const isWrong = selected && selected !== opt.label;
            return (
              <button
                key={opt.label}
                onClick={() => handleSelect(opt)}
                disabled={!!selected}
                className={`
                  w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-300 cursor-pointer
                  ${isSelected
                    ? "bg-yellow-400/20 border-yellow-400 scale-[1.01]"
                    : isWrong
                    ? "bg-gray-900/30 border-gray-800 opacity-40"
                    : "bg-gray-900/60 border-gray-700/50 hover:border-gray-500 hover:bg-gray-800/60"
                  }
                `}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`
                      flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                      ${isSelected ? "bg-yellow-400 text-black" : "bg-gray-800 text-gray-400"}
                    `}
                  >
                    {opt.label}
                  </span>
                  <span className={`text-sm sm:text-base leading-relaxed ${isSelected ? "text-white" : "text-gray-300"}`}>
                    {opt.text}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
