import React from 'react';

const Score = ({ score, total }) => {
  const percentage = Math.round((score / total) * 100);

  const getMessage = () => {
    if (percentage === 100) return "Perfect score! Outstanding!";
    if (percentage >= 80) return "Great job! Well done!";
    if (percentage >= 60) return "Good effort! Keep it up!";
    return "Keep practicing, you'll do better next time!";
  };

  const handleShare = () => {
    const text = `I scored ${score}/${total} (${percentage}%) on the Quiz! Can you beat my score?`;
    navigator.clipboard.writeText(text).then(() => {
      alert("Result copied to clipboard!");
    });
  };

  return (
    <div className="result-box">
      <h1>Quiz Completed!</h1>

      <div className="score-circle">
        <span className="score-number">{score}/{total}</span>
      </div>

      <p className="score-percentage">{percentage}%</p>
      <p className="score-message">{getMessage()}</p>

      <div className="result-buttons">
        <button className="btn-replay" onClick={() => window.location.reload()}>
          Play Again
        </button>
        <button className="btn-share" onClick={handleShare}>
          Share Result
        </button>
      </div>
    </div>
  );
};

export default Score;