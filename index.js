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

// TODO: score best possible guesses
// const guesses = words.map((word) => {
//   // for each word we could possibly guess...
//   possibleWords.map((possibility) => {
//     // ...and each word the solution could be
//     // how much information would this guess give us?
//     // ie: how many possibilities would this guess rule out?
//   });
// });

// // pick the guess that "minimizes the maximum number of remaining possibilities" (Knuth)

// console.log(possibleWords);

// // const words = fs
// //   .readFileSync("words_alpha.txt", { encoding: "utf8" })
// //   .split("\n")
// //   .map((w) => w.trim().toLowerCase())
// //   .filter((w) => w.length === 5);
