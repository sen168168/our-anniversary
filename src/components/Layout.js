// src/components/Layout.jsx
import React from "react";

export default function Layout({ children }) {
  return (
    <div className="app">
      <div className="bgBlobs" aria-hidden="true">
        <div className="blob blobA" />
        <div className="blob blobB" />
        <div className="blob blobC" />
      </div>

      <main className="stage">
        {children}
        <footer className="footer">
          <span className="footerDot" aria-hidden="true">•</span>
          <span>Made with soft love</span>
          <span className="footerDot" aria-hidden="true">•</span>
        </footer>
      </main>
    </div>
  );
}
