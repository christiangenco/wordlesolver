// https://www.powerlanguage.co.uk/wordle/
// const words = require("./words");

export function evaluateGuess({ solution, guess }) {
  return [...guess].map((letter, index) => {
    return {
      letter,
      included: solution.includes(letter),
      position: letter === solution[index],
    };
  });
}
// exports.evaluateGuess = evaluateGuess;

export function filterPossibilities({ words, guessResults }) {
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
// exports.filterPossibilities = filterPossibilities;

export function solve({ guessResults, words, searchWords = true, onProgress }) {
  return new Promise((resolve, reject) => {
    const possibilities = filterPossibilities({ guessResults, words });

    // score best possible guesses
    let minMaxRemainingPossibilities = words.length;
    let minMaxWord = "";
    // const guesses = possibilities.map((word) => {
    const guesses = [];

    // search words instead of possibilities for a longer but more rigorous search
    const searchArray = searchWords ? words : possibilities;
    for (let i = 0; i < searchArray.length; i++) {
      const word = searchArray[i];
      // console.log({ word, minMaxRemainingPossibilities });
      onProgress({
        percent: i / searchArray.length,
        word,
        minMaxWord,
        minMaxRemainingPossibilities,
      });

      // for each word we could possibly guess...
      const potentialRemainingPossibilities = [];
      for (const possibility of possibilities) {
        // ...and each word the solution could be
        const guessResult = evaluateGuess({
          solution: possibility,
          guess: word,
        });
        // how much information would this guess give us if we guessed it?
        // ie: how many possibilities would be left?
        const newPossibilities = filterPossibilities({
          guessResults: [...guessResults, guessResult],
          words: possibilities,
        });
        potentialRemainingPossibilities.push(newPossibilities.length);

        // give up early to save time if we already know we won't win the minimax game
        if (newPossibilities.length > minMaxRemainingPossibilities) break;
      }

      // if (potentialRemainingPossibilities.length > 0) {
      const maxRemainingPossibilities = Math.max(
        ...potentialRemainingPossibilities
      );
      if (maxRemainingPossibilities <= minMaxRemainingPossibilities) {
        minMaxWord = word;
        minMaxRemainingPossibilities = maxRemainingPossibilities;
      }
      // console.log({ maxRemainingPossibilities, minMaxRemainingPossibilities });
      guesses.push({
        word,
        potentialRemainingPossibilities,
        maxRemainingPossibilities,
      });
      // }
    }

    // pick the guess that "minimizes the maximum number of remaining possibilities" (Knuth)
    const optimalGuesses = guesses.filter(
      (guess) => guess.maxRemainingPossibilities <= minMaxRemainingPossibilities
    );
    resolve(optimalGuesses);
    // const orderedGuesses = guesses.sort(
    //   (a, b) => a.maxRemainingPossibilities - b.maxRemainingPossibilities
    // );
    // resolve(orderedGuesses);
    // console.log(orderedGuesses[0]);
  });
}
// exports.solve = solve;

// const guessResults = [
//   [
//     { letter: "s", included: false, position: false },
//     { letter: "e", included: false, position: false },
//     { letter: "r", included: false, position: false },
//     { letter: "a", included: true, position: true },
//     { letter: "i", included: false, position: false },
//   ],
//   [
//     { letter: "t", included: false, position: false },
//     { letter: "a", included: true, position: true },
//     { letter: "l", included: true, position: false },
//     { letter: "o", included: false, position: false },
//     { letter: "n", included: true, position: false },
//   ],
// ];

// async function main() {
//   const results = await solve({
//     guessResults,
//     words,
//     searchWords: true,
//     onProgress: ({
//       percent,
//       word,
//       minMaxWord,
//       minMaxRemainingPossibilities,
//     }) => {
//       console.log({ percent, word, minMaxWord, minMaxRemainingPossibilities });
//     },
//   });

//   console.log({ results });
// }

// main();
