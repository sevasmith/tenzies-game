import React from "react";

export default function Dot(props) {
  const style = { backgroundColor: props.color ? "#000000" : "transparent" };

  return (
    <div>
      <p className="dot" style={style}></p>
    </div>
  );
}
