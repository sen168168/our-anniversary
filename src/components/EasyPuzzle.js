// src/components/EasyPuzzle.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

function dist(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export default function EasyPuzzle({ config, onNext }) {
  const arenaRef = useRef(null);
  const targetRef = useRef(null);

  const hearts = config.hearts || ["💗", "💖", "💕"];
  const snapRadius = config.snapRadius ?? 130;

  const [placed, setPlaced] = useState(() => hearts.map(() => false));
  const [positions, setPositions] = useState(() =>
    hearts.map((_, i) => ({
      x: 40 + i * 74,
      y: 280 + (i % 2) * 40,
    }))
  );

  const allPlaced = useMemo(() => placed.every(Boolean), [placed]);

  // Drag state stored in a ref so re-renders don’t stutter.
  const dragRef = useRef({
    active: false,
    index: -1,
    pointerId: null,
    offsetX: 0,
    offsetY: 0,
  });

  const getArenaPoint = (clientX, clientY) => {
    const arena = arenaRef.current?.getBoundingClientRect();
    if (!arena) return { x: 0, y: 0 };
    return {
      x: clientX - arena.left,
      y: clientY - arena.top,
    };
  };

  const getTargetCenter = () => {
    const arena = arenaRef.current?.getBoundingClientRect();
    const target = targetRef.current?.getBoundingClientRect();
    if (!arena || !target) return { x: 0, y: 0 };

    return {
      x: target.left - arena.left + target.width / 2,
      y: target.top - arena.top + target.height / 2,
    };
  };

  const snapToSlot = (idx) => {
    const center = getTargetCenter();
    // spread hearts in a cute cluster inside target
    const angle = (idx / hearts.length) * Math.PI * 2;
    const radius = Math.min(46, 18 + hearts.length * 4);
    const slot = {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius,
    };

    setPositions((prev) => {
      const next = [...prev];
      next[idx] = slot;
      return next;
    });

    setPlaced((prev) => {
      const next = [...prev];
      next[idx] = true;
      return next;
    });
  };

  const onPointerDown = (e, idx) => {
    if (placed[idx]) return;

    const pt = getArenaPoint(e.clientX, e.clientY);
    const current = positions[idx];

    dragRef.current = {
      active: true,
      index: idx,
      pointerId: e.pointerId,
      offsetX: pt.x - current.x,
      offsetY: pt.y - current.y,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    const drag = dragRef.current;
    if (!drag.active) return;

    const pt = getArenaPoint(e.clientX, e.clientY);

    setPositions((prev) => {
      const next = [...prev];
      next[drag.index] = {
        x: pt.x - drag.offsetX,
        y: pt.y - drag.offsetY,
      };
      return next;
    });
  };

  const onPointerUp = (e) => {
    const drag = dragRef.current;
    if (!drag.active) return;

    dragRef.current.active = false;

    const idx = drag.index;
    const heartPos = positions[idx];
    const targetCenter = getTargetCenter();

    if (dist(heartPos, targetCenter) <= snapRadius) {
      snapToSlot(idx);
    }
  };

  useEffect(() => {
    // In case pointerup happens off-element
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positions, placed]);

  return (
    <section className="cardWrap">
      <div className="card">
        <h2 className="title">{config.heading}</h2>
        <p className="sub">{config.subheading}</p>

        <div className="puzzleArena" ref={arenaRef}>
          <div className="glowTarget" ref={targetRef} aria-label="Glowing target area">
            <div className="targetInner" />
            <div className="targetText">Drop hearts here</div>
          </div>

          {hearts.map((h, idx) => (
            <button
              key={idx}
              className={`dragHeart ${placed[idx] ? "placed" : ""}`}
              style={{
                transform: `translate(${positions[idx].x}px, ${positions[idx].y}px)`,
              }}
              onPointerDown={(e) => onPointerDown(e, idx)}
              aria-label={`Heart ${idx + 1}`}
            >
              {h}
            </button>
          ))}
        </div>

        <div className="row spaceBetween">
          <div className="softNote">
            Placed: {placed.filter(Boolean).length} / {hearts.length}
          </div>

          <button
            className="btn primary"
            onClick={onNext}
            disabled={!allPlaced}
            title={!allPlaced ? "Place all hearts first 💗" : "Next"}
          >
            {config.nextText || "Next"}
          </button>
        </div>
      </div>
    </section>
  );
}
