import React from "react";
import { db } from "/firebase.js";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

export default function HighScoreList() {
  const [highScores, setHighScores] = React.useState([]);

  React.useEffect(() => {
    async function fetchHighScores() {
      const querySnapshot = await getDocs(
        query(collection(db, "highscores"), orderBy("time"), limit(10))
      );
      const scores = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(scores);
      setHighScores(scores);
    }

    fetchHighScores();
  }, []);

  return (
    <div className="highscore-list">
      <h2>Topp 10</h2>
      <ol>
        {highScores.map((score, index) => (
          <li key={score.id} className="score-row">
            <div className="rank">{index + 1}.</div>
            <div className="score-name">{score.name}</div>
            <div className="score-time">{score.time} sek</div>
          </li>
        ))}
      </ol>
    </div>
  );
}
