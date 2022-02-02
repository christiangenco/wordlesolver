const fs = require("fs");

const { evaluateGuess, filterPossibilities, solve } = require("../src/solver");
const words = fs.readFileSync("words.txt", { encoding: "utf8" }).split("\n");

async function main() {
  const results = await solve({
    // guessResults,
    words,
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
}

main();
