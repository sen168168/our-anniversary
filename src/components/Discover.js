// src/components/Discover.jsx
import React, { useMemo, useState } from "react";

export default function Discover({ config, total, onNext }) {
  const [openId, setOpenId] = useState(null);
  const [found, setFound] = useState(() => new Set());

  const items = config.items || [];
  const foundCount = found.size;

  const counterText = useMemo(() => `Found ${foundCount} / ${total}`, [foundCount, total]);

  const openItem = useMemo(() => items.find((it) => it.id === openId), [items, openId]);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
    setFound((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  return (
    <section className="cardWrap">
      <div className="card">
        <h2 className="title">{config.heading}</h2>
        <p className="sub">{config.subheading}</p>

        <div className="counterPill">{counterText}</div>

        <div className="floatField cleanCenter" aria-label="Floating icons">
          {/* FLOATING ICONS */}

          {items.map((it, idx) => {
            const isFound = found.has(it.id);
            const isOpen = openId === it.id;

            // hide icon after click
            if (isFound && !isOpen) return null;

            return (
              <button
                key={it.id}
                className={`floatIcon float${idx % 4} ${isOpen ? "activeIcon" : ""} ${isFound ? "fadeOut" : ""}`}
                onClick={() => toggle(it.id)}
                aria-expanded={isOpen}
                title="Click me"
              >
                {it.iconImg ? (
                  <img src={it.iconImg} alt="" className="iconImg" draggable="false" />
                ) : (
                  <span className="emoji">{it.icon}</span>
                )}
              </button>
            );
          })}




          {/* CENTER POPUP (ONLY WHEN CLICKED) */}
          {openItem && (
            <div className="centerOverlay" onClick={() => setOpenId(null)} role="button" tabIndex={0}>
              <div
                className="centerPop"
                onClick={(e) => e.stopPropagation()} // prevents closing when clicking inside
              >
                <div className="centerTop">
                  <div className="centerIcon">
                    {openItem.iconImg ? (
                      <img src={openItem.iconImg} alt="" draggable="false" />
                    ) : (
                      <span>{openItem.icon}</span>
                    )}
                  </div>

                  <button className="closeX" onClick={() => setOpenId(null)} aria-label="Close">
                    ×
                  </button>
                </div>

                <div className="centerTitle">{openItem.title}</div>
                <div className="centerMsg">{openItem.message}</div>

                <div className="centerHint">Tap outside to close</div>
              </div>
            </div>
          )}
        </div>

        <div className="row spaceBetween">
          <div className="softNote">Tip: click an icon again (or tap outside) to hide 💫</div>

          <button
            className="btn primary"
            onClick={onNext}
            disabled={foundCount === 0}
            title={foundCount === 0 ? "Find at least one icon first!" : "Next"}
          >
            {config.nextText || "Next"}
          </button>
        </div>
      </div>
    </section>
  );
}
