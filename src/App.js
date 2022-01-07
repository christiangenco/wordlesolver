import { useState, useEffect } from "react";
import { useImmer } from "use-immer";

import Header from "./Header";
import Grid from "./Grid";
import AddGuessForm from "./AddGuessForm";

import words from "./words";
import { filterPossibilities, solve } from "./solver";

function App() {
  const [guessResults, updateGuessResults] = useImmer([
    [
      { letter: "s", included: false, position: false },
      { letter: "e", included: false, position: false },
      { letter: "r", included: false, position: false },
      { letter: "a", included: true, position: true },
      { letter: "i", included: false, position: false },
    ],
  ]);

  const possibilities = filterPossibilities({ words, guessResults });

  useEffect(async () => {
    const bestGuesses = await solve({
      guessResults,
      words,
      searchWords: true,
      onProgress: ({ progress }) => {
        console.log({ progress });
      },
    });
  }, [guessResults]);

  return (
    <div className="dark:bg-gray-900 min-w-max min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          <Header />
          <Grid
            guessResults={guessResults}
            updateGuessResults={updateGuessResults}
          />
          <AddGuessForm words={words} updateGuessResults={updateGuessResults} />
          <pre className="dark:text-white">
            {possibilities.length}
            {JSON.stringify({ possibilities }, null, 2)}}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;
