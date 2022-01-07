import { useState } from "react";
import "animate.css";

function Animation({ children }) {
  const className = "";
  return <div className={className}>{children}</div>;
}

export default function useAnimation() {
  function animate(title, duration = 1) {
    console.log("animating");
    const className = `animate__animated animate__${title}`;
    console.log({ title, duration, className });
  }
  return { animate, Animation };
}

// export default function animate(fn) {
//   // const [className, setClassName] = useState("");

//   function headShake(duration = 1) {
//     console.log("shakingX");
//     setClassName("animate__animated animate__headShake");
//   }
//   return <div className={className}>{fn({ headShake })}</div>;
// }
