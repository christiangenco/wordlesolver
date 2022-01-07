// https://www.powerlanguage.co.uk/wordle/
const fs = require("fs");
const words = require("./words");

function evaluateGuess({ solution, guess }) {
  return [...guess].map((letter, index) => {
    return {
      letter,
      included: solution.includes(letter),
      position: letter === solution[index],
    };
  });
}
exports.evaluateGuess = evaluateGuess;

function filterPossibilities({ words, guessResults }) {
  const includedLetters = [
    ...new Set(
      guessResults
        .flat()
        .filter((l) => l.included)
        .map((l) => l.letter)
    ),
  ];

  const notIncluded = [
    ...new Set(
      guessResults
        .flat()
        .filter((l) => !l.included)
        .map((l) => l.letter)
    ),
  ];

  // single-char string if it's known positive, array for a set of known negatives
  const knownLetters = [[], [], [], [], []];
  guessResults.forEach((guessResult) => {
    guessResult.forEach(({ letter, included, position }, i) => {
      if (position) {
        knownLetters[i] = letter;
      } else if (included) {
        // skip if there's already a known letter in this position
        if (typeof knownLetters[i] === "object") {
          knownLetters[i].push(letter);
        }
      }
    });
  });
  const regexString = knownLetters
    .map((letterOrArray) => {
      if (typeof letterOrArray === "object") {
        if (letterOrArray.length === 0) return ".";
        return `[^${letterOrArray.join()}]`;
      } else return letterOrArray;
    })
    .join("");

  // new RegExp("^b.[^a][^n].$", "i");
  const positionPattern = new RegExp(`^${regexString}$`);

  return words
    .filter((w) => positionPattern.test(w))
    .filter((w) => includedLetters.every((l) => w.includes(l)))
    .filter((w) => !notIncluded.some((l) => w.includes(l)));
}
exports.filterPossibilities = filterPossibilities;

const guessResults = [
  // [
  //   { letter: "p", included: false, position: false },
  //   { letter: "e", included: false, position: false },
  //   { letter: "a", included: true, position: false },
  //   { letter: "c", included: false, position: false },
  //   { letter: "h", included: false, position: false },
  // ],
  // [
  //   { letter: "f", included: false, position: false },
  //   { letter: "r", included: false, position: false },
  //   { letter: "i", included: false, position: false },
  //   { letter: "t", included: false, position: false },
  //   { letter: "s", included: false, position: false },
  // ],
  // [
  //   { letter: "b", included: true, position: true },
  //   { letter: "o", included: false, position: false },
  //   { letter: "u", included: false, position: false },
  //   { letter: "n", included: true, position: false },
  //   { letter: "d", included: false, position: false },
  // ],
];

const possibilities = filterPossibilities({ guessResults, words });
console.log({ possibilities });

// score best possible guesses
// map words instead of possibilities for a longer but more rigorous search
let minMaxRemainingPossibilities = words.length;
// const guesses = possibilities.map((word) => {
const guesses = [];
for (word of possibilities) {
  console.log({ word, minMaxRemainingPossibilities });

  // for each word we could possibly guess...
  const potentialRemainingPossibilities = [];
  for (possibility of possibilities) {
    // ...and each word the solution could be
    const guessResult = evaluateGuess({ solution: possibility, guess: word });
    // how much information would this guess give us if we guessed it?
    // ie: how many possibilities would be left?
    const newPossibilities = filterPossibilities({
      guessResults: [...guessResults, guessResult],
      words: possibilities,
    });
    potentialRemainingPossibilities.push(newPossibilities.length);
    if (newPossibilities.length > minMaxRemainingPossibilities) break;
  }

  // if (potentialRemainingPossibilities.length > 0) {
  const maxRemainingPossibilities = Math.max(
    ...potentialRemainingPossibilities
  );
  minMaxRemainingPossibilities = Math.min(
    minMaxRemainingPossibilities,
    maxRemainingPossibilities
  );
  console.log({ maxRemainingPossibilities, minMaxRemainingPossibilities });
  guesses.push({
    word,
    potentialRemainingPossibilities,
    maxRemainingPossibilities,
  });
  // }
}

// pick the guess that "minimizes the maximum number of remaining possibilities" (Knuth)
const orderedGuesses = guesses.sort(
  (a, b) => a.maxRemainingPossibilities - b.maxRemainingPossibilities
);
console.log(orderedGuesses[0]);
