// Draw a Panini-style player card on a canvas element
export function drawPlayerCard(canvas, player, score) {
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  // Background gradient
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#0d1a2e");
  bg.addColorStop(0.5, "#111827");
  bg.addColorStop(1, "#0a0f1e");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Card border glow
  const borderGrad = ctx.createLinearGradient(0, 0, W, H);
  borderGrad.addColorStop(0, player.color);
  borderGrad.addColorStop(0.5, "#eab308");
  borderGrad.addColorStop(1, player.color);

  ctx.strokeStyle = borderGrad;
  ctx.lineWidth = 4;
  roundRect(ctx, 4, 4, W - 8, H - 8, 16);
  ctx.stroke();

  // Inner card background
  const innerBg = ctx.createLinearGradient(0, 0, 0, H * 0.55);
  innerBg.addColorStop(0, player.color + "33");
  innerBg.addColorStop(1, "transparent");
  ctx.fillStyle = innerBg;
  roundRect(ctx, 8, 8, W - 16, H - 16, 12);
  ctx.fill();

  // FIFA-style header band
  ctx.fillStyle = player.color + "cc";
  ctx.fillRect(8, 8, W - 16, 60);

  // "WORLD CUP VIBE" text
  ctx.fillStyle = "#eab308";
  ctx.font = "bold 11px 'Arial', sans-serif";
  ctx.textAlign = "center";
  ctx.letterSpacing = "3px";
  ctx.fillText("WORLD CUP VIBE", W / 2, 32);

  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.font = "bold 10px 'Arial', sans-serif";
  ctx.fillText("PERSONALITY CARD", W / 2, 52);

  // Score circle
  const cx = W / 2;
  const cy = H * 0.38;
  const radius = Math.min(W, H) * 0.22;

  // Outer glow ring
  const glow = ctx.createRadialGradient(cx, cy, radius * 0.7, cx, cy, radius * 1.2);
  glow.addColorStop(0, player.color + "44");
  glow.addColorStop(1, "transparent");
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 1.2, 0, Math.PI * 2);
  ctx.fillStyle = glow;
  ctx.fill();

  // Score arc background
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,255,255,0.1)";
  ctx.lineWidth = 8;
  ctx.stroke();

  // Score arc fill
  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + (score / 100) * Math.PI * 2;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, startAngle, endAngle);
  ctx.strokeStyle = "#eab308";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.stroke();

  // Score circle inner fill
  ctx.beginPath();
  ctx.arc(cx, cy, radius - 10, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0,0,0,0.6)";
  ctx.fill();

  // Score number
  ctx.fillStyle = "#eab308";
  ctx.font = `bold ${radius * 0.8}px 'Arial Black', sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(score, cx, cy - 8);

  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = `bold ${radius * 0.28}px 'Arial', sans-serif`;
  ctx.fillText("ENERGY %", cx, cy + radius * 0.45);

  ctx.textBaseline = "alphabetic";

  // Flag
  ctx.font = `${radius * 0.65}px serif`;
  ctx.fillText(player.flag, cx, cy + radius * 1.6);

  // Player name
  ctx.fillStyle = "white";
  ctx.font = `bold ${Math.min(22, W * 0.09)}px 'Arial Black', 'Arial', sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText(player.name.toUpperCase(), cx, H - 90);

  // Country
  ctx.fillStyle = player.color;
  ctx.font = `bold 13px 'Arial', sans-serif`;
  ctx.fillText(player.country.toUpperCase(), cx, H - 70);

  // Position
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = "12px 'Arial', sans-serif";
  ctx.fillText(player.position, cx, H - 50);

  // Bottom shimmer line
  const shimmer = ctx.createLinearGradient(20, 0, W - 20, 0);
  shimmer.addColorStop(0, "transparent");
  shimmer.addColorStop(0.3, player.color + "88");
  shimmer.addColorStop(0.7, "#eab30888");
  shimmer.addColorStop(1, "transparent");
  ctx.fillStyle = shimmer;
  ctx.fillRect(20, H - 30, W - 40, 2);

  // Serial number
  ctx.fillStyle = "rgba(255,255,255,0.2)";
  ctx.font = "9px monospace";
  ctx.textAlign = "right";
  ctx.fillText(`WCV-${Math.floor(Math.random() * 9000 + 1000)}`, W - 20, H - 14);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export function canvasToBlob(canvas) {
  return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
}
