import Header from "./Header";
import Grid from "./Grid";
import AddGuessForm from "./AddGuessForm";

function App() {
  return (
    <div className="dark:bg-gray-900 min-w-max min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" mx-auto">
          <div className="h-64"></div>
          <Header />
          <div className="mx-auto mt-16">
            <div className="flex font-bold text-xl relative">
              {[..."6Ju1dQZKcXXkRpLuNP9DfeEFWvYZC8KPUWVuPCwiK1Ae1cSZKiq"].map(
                (l) => (
                  <button
                    className={`${
                      Math.random() > 0.5
                        ? "bg-gray-500 hover:bg-gray-400 text-white"
                        : Math.random() > 0.5
                        ? "bg-green-600 hover:bg-green-500 text-white"
                        : "bg-yellow-500 hover:bg-yellow-400 text-white"
                    } w-8 h-8 mb-1 mr-1 flex items-center justify-center`}
                  >
                    {l}
                  </button>
                )
              )}
            </div>
            <div className="flex font-bold text-xl relative">
              {[..."6Ju1dQZKcXXkRpLuNP9DfeEFWvYZC8KPUWVuPCwiK1Ae1cSZKiq"].map(
                (l) => (
                  <button
                    className={`border w-8 h-8 mb-1 mr-1 flex items-center justify-center`}
                  >
                    {" "}
                  </button>
                )
              )}
            </div>
            <div className="mt-10 flex justify-center align-middle items-center">
              <img
                src="https://coin-tracker-public.s3-us-west-1.amazonaws.com/crypto-icons/cmc/64x64/74.png"
                className="h-8 w-8 mr-1"
                alt=""
              />
              10,000 DOGE
            </div>
            <div className="flex items-center text-center align-middle mt-10">
              <button className="bg-green-500 inline px-2 py-2 rounded text-white mx-auto">
                buy 10 more guesses
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
