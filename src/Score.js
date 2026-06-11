import React from 'react';

/**
 * Score (hoặc Result) là một FUNCTIONAL COMPONENT hiển thị kết quả thi của người dùng.
 * Component này nhận dữ liệu và các hàm callback từ component cha (QuizApp) thông qua Props.
 * Các nội dung chính được chú thích cho người học:
 * - Cách destructure Props trực tiếp trong tham số hàm.
 * - Cách tính toán phần trăm động từ Props.
 * - Gọi hàm callback từ cha (onReplay) thay vì tự reload trang web.
 */
const Score = ({ score, total, onReplay }) => {
  // Tính toán phần trăm điểm số đạt được và làm tròn
  const percentage = Math.round((score / total) * 100);

  // Hàm cục bộ quyết định thông điệp nhận xét dựa trên phần trăm điểm
  const getMessage = () => {
    if (percentage === 100) return "Perfect score! Outstanding!";
    if (percentage >= 80) return "Great job! Well done!";
    if (percentage >= 60) return "Good effort! Keep it up!";
    return "Keep practicing, you'll do better next time!";
  };

  // Hàm xử lý chia sẻ kết quả bằng cách copy vào Clipboard thông qua browser API
  const handleShare = () => {
    const text = `I scored ${score}/${total} (${percentage}%) on the Quiz! Can you beat my score?`;
    navigator.clipboard.writeText(text).then(() => {
      alert("Result copied to clipboard!");
    });
  };

  return (
    <div className="result-box">
      <h1>Quiz Completed!</h1>

      {/* Vòng tròn điểm số */}
      <div className="score-circle">
        <span className="score-number">{score}/{total}</span>
      </div>

      <p className="score-percentage">{percentage}%</p>
      <p className="score-message">{getMessage()}</p>

      <div className="result-buttons">
        {/* Nút chơi lại: Gọi hàm onReplay nhận được từ props của cha (QuizApp) để reset state */}
        <button className="btn-replay" onClick={onReplay}>
          Play Again
        </button>
        {/* Nút chia sẻ: Gọi hàm handleShare cục bộ */}
        <button className="btn-share" onClick={handleShare}>
          Share Result
        </button>
      </div>
    </div>
  );
};

export default Score;