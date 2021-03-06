const fs = require("fs");

const { evaluateGuess, filterPossibilities, solve } = require("../src/solver");
const words = fs.readFileSync("words.txt", { encoding: "utf8" }).split("\n");

const guessResults = [
  // [
  //   { letter: "4", included: false, position: false },
  //   { letter: "2", included: true, position: false },
  //   { letter: "*", included: true, position: true },
  //   { letter: "9", included: false, position: false },
  //   { letter: "=", included: true, position: false },
  //   { letter: "3", included: false, position: false },
  //   { letter: "7", included: false, position: false },
  //   { letter: "8", included: true, position: false },
  // ],
  // [
  //   { letter: "8", included: true, position: false },
  //   { letter: "+", included: false, position: false },
  //   { letter: "1", included: true, position: false },
  //   { letter: "*", included: true, position: false },
  //   { letter: "9", included: false, position: false },
  //   { letter: "=", included: true, position: false },
  //   { letter: "1", included: true, position: false },
  //   { letter: "7", included: false, position: false },
  // ],
];

async function main() {
  // const possibilities = filterPossibilities({ words, guessResults });
  // console.log({ possibilities });
  // process.exit(0);
  const shuffledWords = words.sort(() => 0.5 - Math.random());
  const possibilities = words.sort(() => 0.5 - Math.random());
  const results = await solve({
    guessResults,
    words: shuffledWords,
    possibilities,
    searchWords: true,
    onProgress: ({
      percent,
      word,
      minMaxWord,
      minMaxRemainingPossibilities,
    }) => {
      console.log({ percent, word, minMaxWord, minMaxRemainingPossibilities });
    },
  });

  console.log({ results });
  console.log({ possibilities });
}

main();
