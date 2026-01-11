// src/components/Letter.jsx
import React, { useEffect, useMemo, useState } from "react";

function makeSeededRandom(seed) {
  // simple deterministic-ish random generator for stable positions
  let t = seed + 0x6d2b79f5;
  return () => {
    t += 0x6d2b79f5;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

export default function Letter({ config, girlfriendName }) {
  const [heartClicks, setHeartClicks] = useState(0);
  const [typed, setTyped] = useState("");

  const normalizedTyped = typed.trim().toLowerCase();
  // const normalizedName = (girlfriendName || "").trim().toLowerCase();
  const validNames = ["acela", "pisey"];

  const unlockedByHearts = heartClicks >= 5;
  const unlockedByName =
    // normalizedTyped.length > 0 && normalizedTyped === normalizedName;
    normalizedTyped.length > 0 && validNames.includes(normalizedTyped);

  const unlocked = unlockedByHearts || unlockedByName;

  const lockStatus = useMemo(() => {
    if (unlocked) return "Unlocked 🔓";
    const left = Math.max(0, 5 - heartClicks);
    return `Locked 🔒(click ${left} more heart${left === 1 ? "" : "s"}…)`;
  }, [unlocked, heartClicks]);

  // Create many falling pieces from your photo list
  const photoPieces = useMemo(() => {
    const photos = config.photos || [];
    if (!photos.length) return [];

    // how many total falling photos on screen
    const count = Math.max(28, photos.length * 5);
    const rand = makeSeededRandom(777);

    const pieces = Array.from({ length: count }).map((_, i) => {
      const p = photos[i % photos.length];

      const left = Math.floor(rand() * 100); // vw
      const delay = +(rand() * 4).toFixed(2); // seconds
      const duration = +(3 + rand() * 3).toFixed(2); // seconds
      const size = Math.floor(32 + rand() * 32); // px
      const rotate = Math.floor(-18 + rand() * 36); // deg
      const drift = Math.floor(-40 + rand() * 80); // px side drift

      // some pieces "float" (slower + gentler), mixed in
      const floaty = rand() > 0.55;

      return {
        key: `${i}-${p.src}`,
        src: p.src,
        alt: p.alt || "photo",
        left,
        delay,
        duration: floaty ? duration + 4 : duration,
        size,
        rotate,
        drift: floaty ? drift * 0.6 : drift,
        floaty,
      };
    });

    return pieces;
  }, [config.photos]);

  // Optional: add a class to body when unlocked (for extra sparkle if you want later)
  useEffect(() => {
    if (!unlocked) return;
    document.body.classList.add("loveUnlocked");
    return () => document.body.classList.remove("loveUnlocked");
  }, [unlocked]);

  return (
    <section className="cardWrap">
      <div className="card letterCard">
        {/* PHOTO RAIN OVERLAY (only after unlock) */}
        {unlocked && (config.photos || []).length > 0 && (
          <div className="photoRain" aria-hidden="true">
            {photoPieces.map((piece) => (
              <div
                key={piece.key}
                className={`photoPiece ${piece.floaty ? "floaty" : ""}`}
                style={{
                  left: `${piece.left}vw`,
                  animationDelay: `${piece.delay}s`,
                  animationDuration: `${piece.duration}s`,
                  width: `${piece.size}px`,
                  height: `${piece.size}px`,
                  transform: `rotate(${piece.rotate}deg)`,
                  "--drift": `${piece.drift}px`,
                }}
              >
                <img src={piece.src} alt={piece.alt} draggable="false" />
              </div>
            ))}
          </div>
        )}

        <div className="row spaceBetween">
          <h2 className="title">
            {unlocked ? "A Letter For U" : config.headingLocked}
          </h2>
          <div className={`counterPill ${unlocked ? "pillGood" : ""}`}>
            {lockStatus}
          </div>
        </div>

        {!unlocked && (
          <>
            <p className="sub">{config.hint}</p>

            <div className="unlockZone">
              <button
                className="heartButton"
                onClick={() => setHeartClicks((n) => n + 1)}
                aria-label="Click heart to unlock"
                title="Click me!"
              >
                ❤️
              </button>
              <button
                className="heartButton"
                onClick={() => setHeartClicks((n) => n + 1)}
                aria-label="Click heart to unlock"
                title="Click me!"
              >
                🩷
              </button>
              <button
                className="heartButton"
                onClick={() => setHeartClicks((n) => n + 1)}
                aria-label="Click heart to unlock"
                title="Click me!"
              >
                💙
              </button>
              <button
                className="heartButton"
                onClick={() => setHeartClicks((n) => n + 1)}
                aria-label="Click heart to unlock"
                title="Click me!"
              >
                💛
              </button>
              <button
                className="heartButton"
                onClick={() => setHeartClicks((n) => n + 1)}
                aria-label="Click heart to unlock"
                title="Click me!"
              >
                🫀
              </button>
            </div>

            <div className="typeRow">
              <input
                className="input"
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                placeholder={config.typedPlaceholder}
                autoComplete="off"
              />
              <div className="typeHint">
                My gf's is...🤔<span className="mono"></span>
              </div>
            </div>
          </>
        )}

        {unlocked && (
          <div className="letterPaper">
            <pre className="letterText" aria-label="Love letter">
              {config.content.join("\n")}
            </pre>

            <div className="finalLine">{config.finalLine}</div>

            <div className="confettiRow" aria-hidden="true">
              <span>🌸</span><span>12th</span><span>January</span><span>2026</span><span>🌸</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
