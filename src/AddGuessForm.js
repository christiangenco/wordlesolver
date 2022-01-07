import { useState } from "react";

import Animation from "./Animation";

export default function AddGuessForm({ updateGuessResults, words }) {
  const [guess, setGuess] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (words.includes(guess)) {
          updateGuessResults((draft) => {
            draft.push(
              [...guess].map((letter) => ({
                letter,
                included: false,
                position: false,
              }))
            );
          });
          setGuess("");
        } else {
          alert(`"${guess}" isn't a word, according to Wordle`);
        }
      }}
      className="flex justify-center flex-col"
    >
      <Animation
        className="flex justify-center"
        render={({ headShake }) => {
          return (
            <input
              type="text"
              className="uppercase font-bold text-3xl bg-gray-200 rounded px-2 py-1 mx-auto w-80 tracking-[0.5em]"
              value={guess}
              onChange={(e) => {
                const newGuess = e.target.value;
                if (newGuess.length > 5) {
                  headShake(0.5);
                } else setGuess(e.target.value.toLowerCase());
              }}
            />
          );
        }}
      />

      <button
        type="submit"
        className="mt-1 w-80 bg-green-500 text-green-100 text-center mx-auto rounded px-2 py-1 text-xl"
      >
        add guess
      </button>
    </form>
  );
}
