import React from "react";
import { db } from "/firebase.js";
import { collection, addDoc } from "firebase/firestore";

export default function HighScoreForm(props) {
  const [playerName, setPlayerName] = React.useState("");
  const [showNameInput, setShowNameInput] = React.useState(false);

  async function saveHighScore() {
    try {
      await addDoc(collection(db, "highscores"), {
        //todo Legge til en id, for så å fjerne key=index i listevisningen
        name: playerName || "Anonym",
        time: parseFloat(props.elapsedTime),
        date: new Date(),
      });
      alert("High score lagret!");
      setShowNameInput(false);
    } catch (e) {
      console.error("Feil ved lagring:", e);
    }
  }
  return (
    <div className="winner-info">
      <p>Du klarte det på {props.elapsedTime} sekunder!</p>
      {showNameInput ? (
        <div>
          <input
            type="text"
            placeholder="Skriv navnet ditt"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button onClick={saveHighScore}>Lagre</button>
        </div>
      ) : (
        <button onClick={() => setShowNameInput(true)}>Lagre high score</button>
      )}
    </div>
  );
}
