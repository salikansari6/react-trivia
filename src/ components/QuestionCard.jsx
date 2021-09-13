import React from "react";
import { QUESTIONS_LENGTH } from "../constants";

const QuestionCard = ({ currentQuestion, setUserAnswers, currentIndex }) => {
  const handleOptionChange = (e) => {
    setUserAnswers((prev) => {
      return prev.map((ans, index) => {
        if (index === currentIndex) {
          return e.target.value;
        } else {
          return ans;
        }
      });
    });
  };

  const { answers } = currentQuestion;

  return (
    <div className="question-card">
      <p className="question-number">
        Question : {currentIndex + 1} / {QUESTIONS_LENGTH}
      </p>
      <div
        className="question"
        dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
      />
      <div className="answers">
        {answers.map((option) => (
          <div key={option}>
            <input
              type="radio"
              name="option"
              value={option}
              onChange={handleOptionChange}
              id={option}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
