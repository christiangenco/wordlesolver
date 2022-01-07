const { evaluateGuess, filterPossibilities } = require("./index");

test("evaluateGuess correctly matches word", () => {
  expect(evaluateGuess({ solution: "beans", guess: "beans" })).toEqual([
    { letter: "b", included: true, position: true },
    { letter: "e", included: true, position: true },
    { letter: "a", included: true, position: true },
    { letter: "n", included: true, position: true },
    { letter: "s", included: true, position: true },
  ]);
});

test("evaluateGuess marks non-included letters", () => {
  expect(evaluateGuess({ solution: "beans", guess: "beams" })).toEqual([
    { letter: "b", included: true, position: true },
    { letter: "e", included: true, position: true },
    { letter: "a", included: true, position: true },
    { letter: "m", included: false, position: false },
    { letter: "s", included: true, position: true },
  ]);
});

test("filterPossibilities returns only words that include included letters", () => {
  const words = ["aaaaa", "bbbbb"];
  const guessResults = [
    [
      { letter: "a", included: true, position: true },
      { letter: "b", included: false, position: false },
      { letter: "a", included: true, position: true },
      { letter: "b", included: false, position: false },
      { letter: "a", included: true, position: true },
    ],
  ];
  expect(filterPossibilities({ words, guessResults })).toEqual(["aaaaa"]);
});

test("filterPossibilities returns only words that don't included non-included letters", () => {
  const words = ["aaaaa", "bbbbb", "abbbb"];
  const guessResults = [
    [
      { letter: "a", included: true, position: true },
      { letter: "b", included: false, position: false },
      { letter: "a", included: true, position: true },
      { letter: "b", included: false, position: false },
      { letter: "a", included: true, position: true },
    ],
  ];
  expect(filterPossibilities({ words, guessResults })).toEqual(["aaaaa"]);
});

test("filterPossibilities returns words with matched letter positions", () => {
  const words = ["aaabb", "bbbaa"];
  const guessResults = [
    [
      { letter: "a", included: true, position: true },
      { letter: "b", included: true, position: false },
      { letter: "a", included: true, position: true },
      { letter: "b", included: true, position: true },
      { letter: "a", included: true, position: false },
    ],
  ];
  expect(filterPossibilities({ words, guessResults })).toEqual(["aaabb"]);
});
