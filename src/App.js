// src/App.js
import React, { useMemo, useState } from "react";
import Layout from "./components/Layout";
import Teaser from "./components/Teaser";
import Discover from "./components/Discover";
import EasyPuzzle from "./components/EasyPuzzle";
import Letter from "./components/Letter";
import config from "./data/config";

const STEPS = {
  TEASER: "TEASER",
  DISCOVER: "DISCOVER",
  PUZZLE: "PUZZLE",
  LETTER: "LETTER",
};

function App() {
  const [step, setStep] = useState(STEPS.TEASER);

  const totalDiscover = useMemo(() => config.discover.items.length, []);

  return (
    <Layout>
      {step === STEPS.TEASER && (
        <Teaser
          config={config.teaser}
          onNext={() => setStep(STEPS.DISCOVER)}
        />
      )}

      {step === STEPS.DISCOVER && (
        <Discover
          config={config.discover}
          total={totalDiscover}
          onNext={() => setStep(STEPS.PUZZLE)}
        />
      )}

      {step === STEPS.PUZZLE && (
        <EasyPuzzle
          config={config.puzzle}
          onNext={() => setStep(STEPS.LETTER)}
        />
      )}

      {step === STEPS.LETTER && (
        <Letter
          config={config.letter}
          girlfriendName={config.girlfriendName}
        />
      )}
    </Layout>
  );
}

export default App;
