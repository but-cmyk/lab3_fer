import React from 'react';

const Question = ({ data, onAnswer, questionNumber, total, selectedAnswer, feedback }) => {
  return (
    <div className="question-box">
      {/* Progress indicator */}
      <div className="progress">
        <span>Question {questionNumber} of {total}</span>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(questionNumber / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Question text */}
      <p className="question-text">{data.question}</p>

      {/* Answer options */}
      <div className="options">
        {data.options.map((option) => {
          let className = "option-button";
          if (selectedAnswer !== null) {
            if (option === data.answer) {
              className += " correct";
            } else if (option === selectedAnswer) {
              className += " wrong";
            }
          }
          return (
            <button
              key={option}
              className={className}
              onClick={() => onAnswer(option)}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Feedback message */}
      {feedback && (
        <p className={`feedback ${feedback}`}>
          {feedback === 'correct' ? '✓ Correct!' : '✗ Wrong answer!'}
        </p>
      )}
    </div>
  );
};

export default Question;