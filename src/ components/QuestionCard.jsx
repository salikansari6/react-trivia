import React from "react";

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
      <p className="question-number">Question : {currentIndex + 1} / 5</p>
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
