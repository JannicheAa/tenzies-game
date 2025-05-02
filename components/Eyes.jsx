import React from "react";

export default function Eyes(props) {
  switch (props.value) {
    case 1:
      return <div className="dot one-eye"></div>;
    case 2:
      return (
        <div className="two-eyes">
          <div className="dot"></div>
          <div className="dot empty"></div>
          <div className="dot empty"></div>
          <div className="dot"></div>
        </div>
      );
    case 3:
      return (
        <div className="three-eyes">
          <div className="dot"></div>
          <div className="dot empty"></div>
          <div className="dot empty"></div>
          <div className="dot empty"></div>
          <div className="dot"></div>
          <div className="dot empty"></div>
          <div className="dot empty"></div>
          <div className="dot empty"></div>
          <div className="dot"></div>
        </div>
      );
    case 4:
      return (
        <div className="four-eyes">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      );
    case 5:
      return (
        <div className="five-eyes">
          <div className="dot"></div>
          <div className="dot empty"></div>
          <div className="dot"></div>
          <div className="dot empty"></div>
          <div className="dot"></div>
          <div className="dot empty"></div>
          <div className="dot"></div>
          <div className="dot empty"></div>
          <div className="dot"></div>
        </div>
      );
    case 6:
      return (
        <div className="six-eyes">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      );
    default:
      return null;
  }
}
