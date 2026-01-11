// src/components/Teaser.jsx
import React, { useMemo, useRef, useState } from "react";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default function Teaser({ config, onNext }) {
  const containerRef = useRef(null);
  const [dodges, setDodges] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const canClick = dodges >= (config.dodgeTimes ?? 2);

  const hintText = useMemo(() => {
    if (canClick) return "Okay okay… oun can click now 😭";
    return "Try to click… 🤭";
  }, [canClick]);

  const dodge = () => {
    if (canClick) return;

    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    // move within a cute range so it feels playful but not annoying
    const maxX = rect.width * 0.22;
    const maxY = rect.height * 0.18;

    const nextX = (Math.random() * 2 - 1) * maxX;
    const nextY = (Math.random() * 2 - 1) * maxY;

    setPos({
      x: clamp(nextX, -maxX, maxX),
      y: clamp(nextY, -maxY, maxY),
    });

    setDodges((d) => d + 1);
  };

  return (
    <section className="cardWrap" ref={containerRef}>
      <div className="card teaserCard">
        <div className="sparkleRow" aria-hidden="true">
          <span>✦</span><span>✧</span><span>✦</span>
        </div>

        <h1 className="title">{config.title}</h1>
        {config.subtitle && <p className="sub">{config.subtitle}</p>}

        <p className="tinyHint">{hintText}</p>

        <div className="teaserBtnZone">
          <button
            className={`btn primary ${canClick ? "" : "dodgy"}`}
            style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
            onMouseEnter={dodge}
            onFocus={dodge}
            onClick={() => {
              // On mobile there’s no hover; allow click after dodge count OR first click if user tries.
              if (!canClick && (config.dodgeTimes ?? 2) > 0) {
                // treat early click as a dodge moment instead of blocking hard
                dodge();
                return;
              }
              onNext();
            }}
          >
            {config.buttonText || "Open"}
          </button>
        </div>

        <div className="tinyRow" aria-hidden="true">
          <span>💗</span><span>🌸</span><span>⭐</span>
        </div>
      </div>
    </section>
  );
}
