import React from "react";
import Dot from "./Dot";

const nineDots = Array.from({ length: 9 }, (_, index) => ({
    id: index + 1,
  }));

export default function Die(props) {
  const style = { backgroundColor: props.color ? "#ad260796" : "#ffffff" };

  const dotImages = [
    { number: 1, filled: [0, 5] },
    { number: 2, filled: [1, 9] },
    { number: 3, filled: [1, 5, 9] },
    { number: 4, filled: [1, 3, 7, 9] },
    { number: 5, filled: [1, 3, 5, 7, 9] },
    { number: 6, filled: [1, 3, 4, 6, 7, 9] },
  ];

  function dots(number) {
    return nineDots.map((dot) =>
      dotImages[number - 1].filled.includes(dot.id)
        ? { ...dot, color: true }
        : { ...dot, color: false }
    );
  }

  const dotImage = dots(props.value).map((dot) => <Dot key={dot.id} color={dot.color} />);

  return (
    <div className="die" style={style} onClick={props.holdDice}>
      {dotImage}
    </div>
  );
}
