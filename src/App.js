import { useState } from "react";
import { useImmer } from "use-immer";

import useAnimation from "./useAnimation";
import Header from "./Header";
import Grid from "./Grid";

import words from "./words";
import { filterPossibilities } from "./solver";

function App() {
  const [guess, setGuess] = useState("");
  const [guessResults, updateGuessResults] = useImmer([
    [
      { letter: "s", included: false, position: false },
      { letter: "e", included: false, position: false },
      { letter: "r", included: false, position: false },
      { letter: "a", included: true, position: true },
      { letter: "i", included: false, position: false },
    ],
    [
      { letter: "t", included: false, position: false },
      { letter: "a", included: true, position: true },
      { letter: "l", included: true, position: false },
      { letter: "o", included: false, position: false },
      { letter: "n", included: true, position: false },
    ],
  ]);

  const { animate, Animation } = useAnimation();

  const possibilities = filterPossibilities({ words, guessResults });

  return (
    <div className="dark:bg-gray-900 min-w-max min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          <Header />
          <Grid
            guessResults={guessResults}
            updateGuessResults={updateGuessResults}
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setGuess("");
            }}
          >
            <Animation>
              <input
                type="text"
                className="uppercase font-bold text-3xl bg-gray-200 rounded px-2 py-1"
                value={guess}
                onChange={(e) => {
                  const newGuess = e.target.value;
                  if (newGuess.length > 5) {
                    animate("headShake", 0.5);
                  } else setGuess(e.target.value);
                }}
              />
            </Animation>
            <button type="submit">add guess</button>
          </form>
          <pre className="dark:text-white">
            {possibilities.length}
            {JSON.stringify({ guess, possibilities }, null, 2)}}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;
