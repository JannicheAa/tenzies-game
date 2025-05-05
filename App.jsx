import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import HighScoreForm from "./components/HighScoreForm";
import HighScoreList from "./components/HighScoreList";

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
  const [startTime, setStartTime] = React.useState(null);
  const [elapsedTime, setElapsedTime] = React.useState(null);

  function rollDice() {
    const noDiceHeld = diceArr.every((die) => !die.isHeld);
    if (!tenzies) {
      if (noDiceHeld) {
        setStartTime(performance.now());
        console.log(startTime);
      }
      setDiceArr((prevDiceArr) =>
        prevDiceArr.map((die) => (die.isHeld ? die : generateNewDie()))
      );
    } else {
      setTenzies(false);
      setDiceArr(allNewDice());
      setStartTime(performance.now());
      setElapsedTime(null);
      //setPlayerName("");
      //setShowNameInput(false);
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
    setStartTime(performance.now());
  }, []);

  React.useEffect(() => {
    console.log(startTime);
  }, [startTime]);

  React.useEffect(() => {
    const allHeld = diceArr.every((die) => die.isHeld);
    const firstValue = diceArr[0].value;
    const allSameValue = diceArr.every((die) => die.value === firstValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
      if (startTime !== null) {
        const endTime = performance.now();
        const timeInSeconds = ((endTime - startTime) / 1000).toFixed(2);
        setElapsedTime(timeInSeconds);
      }
    }
  }, [diceArr, startTime]);

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
      <div className="tenzies-card">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Kast til alle terningene er like. Klikk på hver terning for å fryse
          den til sin nåværende verdi mellom kastene.
        </p>
        <div className="dice-container">{diceButtons}</div>

        {tenzies && <HighScoreForm elapsedTime={elapsedTime} />}

        <button className="toss-btn" onClick={rollDice}>
          <span className="toss-btn-text">
            {tenzies ? "Spill på nytt" : "Kast"}
          </span>
        </button>
      </div>
      <HighScoreList />
    </main>
  );
}
