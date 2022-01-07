function Box({ letter, included, position, updateGuessResults, row, col }) {
  let colors = "bg-gray-500 text-white";
  if (included)
    if (position) colors = "bg-green-600 text-white";
    else colors = "bg-yellow-500 text-white";

  if (!letter) colors = "border";

  return (
    <button
      className={`${colors} w-16 h-16 mb-1 mr-1 flex items-center justify-center uppercase`}
      onClick={() => {
        updateGuessResults((draft) => {
          // included,position
          // false,false => true,false => true,true =>

          if (included) {
            if (position) {
              draft[row][col].included = false;
              draft[row][col].position = false;
            } else {
              draft[row][col].included = true;
              draft[row][col].position = true;
            }
          } else {
            draft[row][col].included = true;
            draft[row][col].position = false;
          }
        });
      }}
    >
      {letter}
    </button>
  );
}

function Row({ guessResult, updateGuessResults, row }) {
  return (
    <div className="flex font-bold text-3xl">
      {guessResult.map((resultLetter, i) => (
        <Box
          key={i}
          row={row}
          col={i}
          {...resultLetter}
          updateGuessResults={updateGuessResults}
        />
      ))}
    </div>
  );
}

export default function Grid({ guessResults, updateGuessResults }) {
  return (
    <div className="mx-auto w-80 mt-16">
      {guessResults.map((guessResult, i) => (
        <Row
          key={i}
          row={i}
          guessResult={guessResult}
          updateGuessResults={updateGuessResults}
        />
      ))}
    </div>
  );
}
