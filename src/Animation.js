import { useState, useEffect } from "react";
import "animate.css";

export default function Animation({ render, className: classNameProp }) {
  const [className, setClassName] = useState("");
  const [duration, setDuration] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setClassName(""), duration * 1000);
    return () => clearTimeout(timer);
  }, [duration, className]);

  function headShake(duration = 1) {
    // TODO: make this work if I'm in the middle of an animation?
    // set to
    setDuration(duration);

    setClassName("animate__animated animate__headShake");
  }

  return (
    <div
      className={`${className} ${classNameProp}`}
      style={{ "--animate-duration": `${duration}s` }}
    >
      {render({ headShake })}
    </div>
  );
}

// export default function useAnimation() {
//   function animate(title, duration = 1) {
//     console.log("animating");
//     const className = `animate__animated animate__${title}`;
//     console.log({ title, duration, className });
//   }
//   return { animate, Animation };
// }

// export default function animate(fn) {
//   // const [className, setClassName] = useState("");

// function headShake(duration = 1) {
//   console.log("shakingX");
//   setClassName("animate__animated animate__headShake");
// }
//   return <div className={className}>{fn({ headShake })}</div>;
// }
