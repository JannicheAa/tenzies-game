import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
  // This function generates an array of 10 objects with random numbers between 1 and 6
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  const [diceArr, setDiceArr] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  function rollDice() {
    if (!tenzies) {
      setDiceArr((prevDiceArr) =>
        prevDiceArr.map((die) => (die.isHeld ? die : generateNewDie()))
      );
    } else {
      setTenzies(false);
      setDiceArr(allNewDice());
    }
  }

  function holdDice(id) {
    setDiceArr((prevDiceArr) => {
      return prevDiceArr.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  React.useEffect(() => {
    if (
      diceArr.every(
        (die) => die.isHeld === true && die.value === diceArr[0].value
      )
    ) {
      setTenzies(true);
    }
  }, [diceArr]);

  const diceButtons = diceArr.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
      id={die.id}
    />
  ));

  return (
    <main>
      {tenzies && (
        <Confetti
          colors={[
            "#FF5BCE",
            "#5AB2FF",
            "#6DF5FF",
            "#73FFB0",
            "#CDFF69",
            "#FFB879",
          ]}
        />
      )}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Kast til alle terningene er like. Klikk på hver terning for å fryse den
        til sin nåværende verdi mellom kastene.
      </p>
      <div className="dice-container">{diceButtons}</div>
      <button className="toss-btn" onClick={rollDice}>
        <span className="toss-btn-text">
          {tenzies ? "Spill på nytt" : "Kast"}
        </span>
      </button>
    </main>
  );
}
