const MAX_SOLUTION = 99 * 9;
const MIN_SOLUTION = 1 - 99;
const WORD_LENGTH = 9;

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operators = ["+", "-", "*", "/"];
const letters = [...numbers, ...operators];

function findValidStarts({ start = [], end, startLength }) {
  if (start.length >= startLength) {
    const word = start.join("") + end;
    if (eval(word)) console.log(word.replace("==", "="));
    return;
  }

  for (var i = 0; i < letters.length; i++) {
    const letter = letters[i];
    const needsPreviousNumber = i > 8;
    const previousLetter = start.length > 0 && start[start.length - 1];
    // const previousLetterIndex =
    // previousLetter && letters.indexOf(previousLetter);
    // const previousIsNumber = previousLetterIndex !== -1 && previousLetterIndex <= 8;
    const previousIsNumber = typeof previousLetter === "number";

    const needsSpaceAfter = i > 9;
    const hasSpaceAfter = startLength - start.length > 1;

    // if (start[0] && start[0] === 1) {
    //   console.log(start.join(""));
    //   console.log({
    //     letter,
    //     needsPreviousNumber,
    //     previousLetter,
    //     previousIsNumber,
    //   });
    // }
    // if (start[0] && start[0] > 1) break;

    if (
      (needsPreviousNumber && !previousIsNumber) ||
      (needsSpaceAfter && !hasSpaceAfter)
    ) {
    } else findValidStarts({ start: [...start, letters[i]], end, startLength });
  }
}

// for (let i = MIN_SOLUTION; i <= -98; i++) {
for (let i = MIN_SOLUTION; i <= MAX_SOLUTION; i++) {
  const end = `==${i}`;
  const startLength = WORD_LENGTH - end.length;

  findValidStarts({ end, startLength });
  // if (i > 5) break;
}

process.exit(0);

const words = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const doesNotContain = [3, 7, 8];
const contains = [0, 2, 9];

// 90-78=12

words.forEach((w1) => {
  if (doesNotContain.includes(w1)) return;
  words.forEach((w2) => {
    if (doesNotContain.includes(w2)) return;
    words.forEach((w3) => {
      if (doesNotContain.includes(w3)) return;
      words.forEach((w4) => {
        if (doesNotContain.includes(w4)) return;

        const str = `${w1}9-${w2}${w3}==1${w4}`;
        if (!str.match(/^[^39]..[^29]...[^2]/)) return;
        if (!contains.every((w) => str.includes("" + w))) return;

        // there probably aren't leading zeros
        if (str.match(/[^1-9]0/)) return;

        if (eval(str)) console.log(str);
      });
    });
  });
});
