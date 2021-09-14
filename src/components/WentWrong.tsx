import { Player } from "@lottiefiles/react-lottie-player";
import data from "../lottie/error.json";

function WentWrong() {
  return (
    <div className="flex flex-col items-center mt-8 gap-8">
      <Player autoplay loop src={data} className="w-full h-auto max-w-xs"></Player>
      <h1 className="text-center text-3xl">Something went wrong</h1>
    </div>
  );
}

export default WentWrong;
