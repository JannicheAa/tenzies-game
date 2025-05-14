import React from "react";
import { db } from "/firebase.js";
import { collection, addDoc } from "firebase/firestore";

export default function HighScoreForm({ elapsedTime, onSave }) {
  const [playerName, setPlayerName] = React.useState("");
  const [showNameInput, setShowNameInput] = React.useState(false);
  const [scoreSaved, setScoreSaved] = React.useState(false);

  async function saveHighScore() {
    try {
      await addDoc(collection(db, "highscores"), {
        name: playerName || "Anonym",
        time: parseFloat(elapsedTime),
        date: new Date(),
      });
      setShowNameInput(false);
      setScoreSaved(true);
      onSave?.();
    } catch (e) {
      console.error("Feil ved lagring:", e);
    }
  }

  return scoreSaved ? (
    <p>Din highscore er lagret 🎉</p>
  ) : showNameInput ? (
    <div>
      <input
        type="text"
        placeholder="Skriv navnet ditt"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <button className="save-btn" onClick={saveHighScore}>
        Lagre
      </button>
    </div>
  ) : (
    <button className="save-btn" onClick={() => setShowNameInput(true)}>
      Lagre high score
    </button>
  );
}
