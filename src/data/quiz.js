export const questions = [
  {
    id: 1,
    text: "It's penalties in the final. You step up to take the fifth and decisive kick. What's going through your mind?",
    options: [
      { label: "A", text: "Pure ice. Pick your spot, hit it clean. Pressure is just another word for opportunity.", dims: { finisher: 2, enforcer: 1 } },
      { label: "B", text: "Visualise the crowd going silent after you score. You've already played this moment a thousand times in your head.", dims: { playmaker: 1, entertainer: 2 } },
      { label: "C", text: "Trust the team's prep. You've studied the keeper's tendencies all week.", dims: { enforcer: 2, playmaker: 1 } },
      { label: "D", text: "You want to chip it — the audacity is the point.", dims: { entertainer: 3 } },
    ],
  },
  {
    id: 2,
    text: "Your club signs a megastar who plays in your exact position. How do you react?",
    options: [
      { label: "A", text: "Head down, train harder. Competition makes you better — you'll earn your spot.", dims: { enforcer: 2, finisher: 1 } },
      { label: "B", text: "Adapt — you'll move into a deeper role and control the game from there.", dims: { playmaker: 2, enforcer: 1 } },
      { label: "C", text: "Welcome them publicly, but privately you're plotting to outshine them on debut.", dims: { entertainer: 1, finisher: 2 } },
      { label: "D", text: "Demand a meeting with the coach. You didn't come here to rotate.", dims: { finisher: 2, entertainer: 1 } },
    ],
  },
  {
    id: 3,
    text: "You're 1-0 down with ten minutes left in a World Cup quarter-final. What's your move?",
    options: [
      { label: "A", text: "Drop deep, orchestrate the build-up — if the ball doesn't go through you, it doesn't go at all.", dims: { playmaker: 3 } },
      { label: "B", text: "Run at their back line relentlessly. Speed and chaos is your equaliser.", dims: { entertainer: 2, finisher: 1 } },
      { label: "C", text: "Win every header, every duel. Make the goal feel inevitable through sheer will.", dims: { enforcer: 2, finisher: 1 } },
      { label: "D", text: "Conjure something ridiculous — a no-look assist, a bicycle kick. This is your moment.", dims: { entertainer: 3 } },
    ],
  },
  {
    id: 4,
    text: "How would teammates describe you in the dressing room before a big game?",
    options: [
      { label: "A", text: "The quiet one who does the tactical talk on the training pitch, not with words.", dims: { enforcer: 2, playmaker: 1 } },
      { label: "B", text: "Already bouncing off the walls, buzzing with energy, wanting the music louder.", dims: { entertainer: 2, finisher: 1 } },
      { label: "C", text: "Headphones in, eyes closed — fully locked in their own zone.", dims: { finisher: 3 } },
      { label: "D", text: "Cracking jokes, loosening everyone up — then flipping a switch when the whistle blows.", dims: { playmaker: 1, entertainer: 2 } },
    ],
  },
  {
    id: 5,
    text: "You receive the ball with your back to goal, a defender tight on you. What do you do?",
    options: [
      { label: "A", text: "Hold up, lay it off, and make the run. Simple football, maximum efficiency.", dims: { enforcer: 1, finisher: 2 } },
      { label: "B", text: "Spin them with a flick, nutmeg optional but encouraged.", dims: { entertainer: 3 } },
      { label: "C", text: "Shield, turn, and spray a 40-yard diagonal that breaks the press.", dims: { playmaker: 3 } },
      { label: "D", text: "Win the physical battle first, then carry it forward yourself.", dims: { enforcer: 3 } },
    ],
  },
  {
    id: 6,
    text: "You score the winning goal. How do you celebrate?",
    options: [
      { label: "A", text: "Run straight to the fans, arms wide — you share this moment.", dims: { entertainer: 2, playmaker: 1 } },
      { label: "B", text: "Point to your name on the back of the shirt. You worked for this.", dims: { finisher: 2, enforcer: 1 } },
      { label: "C", text: "A calm knee-slide, eyes closed for one perfect second.", dims: { finisher: 1, playmaker: 2 } },
      { label: "D", text: "Something completely improvised in the moment — the celebration writes itself.", dims: { entertainer: 3 } },
    ],
  },
];

// Dimension scoring → player mapping
// Each player has primary and secondary dimensions
export const players = {
  messi: {
    name: "Lionel Messi",
    flag: "🇦🇷",
    country: "Argentina",
    position: "Forward / No. 10",
    color: "#74b9e7",
    accentColor: "#c8e6c9",
    vibeTitle: "The Magician",
    description:
      "You see the game in slow motion while everyone else is scrambling. Creativity isn't a choice — it's the only language you speak. When the pressure mounts, you don't tighten up; you open up. The ball finds you like a homing signal, and defenders simply cease to exist.",
    primaryDims: ["playmaker", "entertainer"],
  },
  ronaldo: {
    name: "Cristiano Ronaldo",
    flag: "🇵🇹",
    country: "Portugal",
    position: "Forward / Striker",
    color: "#ef4444",
    accentColor: "#fca5a5",
    vibeTitle: "The Machine",
    description:
      "You treat doubt as fuel. Every setback is data, every critic is motivation, and every training session is a championship. Your hunger doesn't plateau — it compounds. You've built yourself into an elite performer through iron will, and the numbers always tell the story.",
    primaryDims: ["finisher", "enforcer"],
  },
  mbappe: {
    name: "Kylian Mbappé",
    flag: "🇫🇷",
    country: "France",
    position: "Forward / Winger",
    color: "#1e3a8a",
    accentColor: "#93c5fd",
    vibeTitle: "The Blur",
    description:
      "You move before anyone realises you've decided. Speed is your philosophy — not just physical pace but the lightning-fast processing of space and moment. You make the impossible look effortless, then you shrug because of course you did. The future isn't waiting for you; you're already there.",
    primaryDims: ["finisher", "entertainer"],
  },
  haaland: {
    name: "Erling Haaland",
    flag: "🇳🇴",
    country: "Norway",
    position: "Striker / Centre-Forward",
    color: "#0ea5e9",
    accentColor: "#e0f2fe",
    vibeTitle: "The Apex Predator",
    description:
      "Clinical is an understatement — you are the definition of ruthless efficiency. Positions, angles, timing: you read them like a native language. You don't celebrate the spectacular; you make the spectacular routine. Inside the box you're a different species, and everyone knows it.",
    primaryDims: ["finisher", "enforcer"],
  },
  vinicius: {
    name: "Vinicius Jr",
    flag: "🇧🇷",
    country: "Brazil",
    position: "Forward / Left Winger",
    color: "#16a34a",
    accentColor: "#bbf7d0",
    vibeTitle: "The Showstopper",
    description:
      "You play football like it's a performance and you're the headline act. Every trick, every stepover, every celebration is an expression of pure joy — and you refuse to let anyone dim that. Your confidence is contagious; when you're on song, the whole team rides the wave.",
    primaryDims: ["entertainer", "finisher"],
  },
  bellingham: {
    name: "Jude Bellingham",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    country: "England",
    position: "Midfielder / Box-to-Box",
    color: "#dc2626",
    accentColor: "#fca5a5",
    vibeTitle: "The Complete Package",
    description:
      "You've got everything and you deploy it exactly when it's needed. Leadership isn't something you wear — it's something you do. You arrive in big moments with an almost eerie composure, score the goal, then get back to defending. No fanfare. Just impact, consistently.",
    primaryDims: ["playmaker", "finisher"],
  },
  pedri: {
    name: "Pedri",
    flag: "🇪🇸",
    country: "Spain",
    position: "Midfielder / Central",
    color: "#dc2626",
    accentColor: "#fde68a",
    vibeTitle: "The Conductor",
    description:
      "You see triangles where others see chaos. Your first touch is a decision and your second touch is three steps ahead of everyone else. Football is chess and you're always a move ahead. You find the impossible pass in tight spaces like it's a reflex, not a calculation.",
    primaryDims: ["playmaker", "enforcer"],
  },
  yamal: {
    name: "Lamine Yamal",
    flag: "🇪🇸",
    country: "Spain",
    position: "Forward / Right Winger",
    color: "#dc2626",
    accentColor: "#fed7aa",
    vibeTitle: "The Prodigy",
    description:
      "You don't know what fear of failure looks like. Every big stage is just a bigger playground, and you play with the fearlessness of someone who hasn't yet been told what's impossible. Your instinct bypasses doubt entirely — you just do the thing, and it works.",
    primaryDims: ["entertainer", "playmaker"],
  },
  rodri: {
    name: "Rodri",
    flag: "🇪🇸",
    country: "Spain",
    position: "Midfielder / Defensive",
    color: "#dc2626",
    accentColor: "#d8b4fe",
    vibeTitle: "The Metronome",
    description:
      "Where others sprint, you glide. Where others react, you anticipate. You control the tempo like a seasoned conductor, and the game bends to your rhythm rather than the other way around. Most people don't notice how much you do — which is exactly how you like it.",
    primaryDims: ["enforcer", "playmaker"],
  },
  vandijk: {
    name: "Virgil van Dijk",
    flag: "🇳🇱",
    country: "Netherlands",
    position: "Defender / Centre-Back",
    color: "#f97316",
    accentColor: "#fed7aa",
    vibeTitle: "The Wall",
    description:
      "You are calm personified. Strikers look at you and recalibrate — maybe that run isn't worth it. Your presence alone changes outcomes. Leadership flows naturally from you because you bring certainty to uncertainty, and your team-mates genuinely believe nothing bad can happen while you're back there.",
    primaryDims: ["enforcer", "playmaker"],
  },
};

// Match player based on dimension scores
export function matchPlayer(scores) {
  // scores = { playmaker: N, finisher: N, enforcer: N, entertainer: N }
  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;

  // Sort dimensions by score
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [top, second] = sorted;

  // Decision tree
  const topDim = top[0];
  const secondDim = second[0];
  const topScore = top[1];

  // Strong single-dimension dominance (>60% of score)
  if (topScore / total > 0.6) {
    if (topDim === "entertainer") return "vinicius";
    if (topDim === "finisher") return "haaland";
    if (topDim === "enforcer") return "rodri";
    if (topDim === "playmaker") return "pedri";
  }

  // Combined dimension matching
  const combo = [topDim, secondDim].sort().join("+");
  const comboMap = {
    "entertainer+playmaker": "messi",
    "entertainer+finisher": "mbappe",
    "enforcer+finisher": "ronaldo",
    "finisher+playmaker": "bellingham",
    "entertainer+enforcer": "yamal",
    "enforcer+playmaker": "vandijk",
  };

  return comboMap[combo] || "messi";
}

export function calcScore(scores, playerKey) {
  const player = players[playerKey];
  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
  let overlap = 0;
  player.primaryDims.forEach((d) => {
    overlap += scores[d] || 0;
  });
  // Scale to 75-99 range for fun display
  const raw = overlap / total;
  return Math.round(75 + raw * 24);
}
