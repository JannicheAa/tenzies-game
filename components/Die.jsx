import React from "react";
import Eyes from "./Eyes";

export default function Die(props) {
  return (
    <button
      className={`die-btn ${props.isHeld ? "held" : ""}`}
      onClick={props.holdDice}
    >
      <Eyes value={props.value} />
    </button>
  );
}
