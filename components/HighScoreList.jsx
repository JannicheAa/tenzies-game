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
      const scores = querySnapshot.docs.map((doc) => doc.data());
      setHighScores(scores);
    }

    fetchHighScores();
  }, []);

  return (
    <div className="highscore-list">
      <h2>Toppliste</h2>
      <ol>
        {highScores.map((score, index) => (
          <li key={index}>
            {score.name}: {score.time} sekunder
          </li>
        ))}
      </ol>
    </div>
  );
}
