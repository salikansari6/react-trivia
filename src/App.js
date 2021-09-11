import React, { useEffect, useState } from "react";
import QuestionCard from "./ components/QuestionCard";
import Popup from "reactjs-popup";
import "./App.css";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showGameOver, setShowGameOver] = useState(false);
  const [userAnswers, setUserAnswers] = useState(new Array(5).fill(null));
  const [loading, setLoading] = useState(true);

  const checkAnswers = () => {
    let currentScore = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === questions[index].correct_answer) {
        currentScore++;
      }
    });
    setScore(currentScore);
  };

  const shuffleAnswers = (incorrectAnswers, correctAnswer) => {
    return [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5);
  };

  const incrementScore = () => {
    setScore((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      if (prev > 0) {
        return prev - 1;
      } else {
        return prev;
      }
    });
  };

  const handlePlayAgain = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowGameOver(false);
    setUserAnswers(new Array(5).fill(null));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      if (prev < questions.length - 1) {
        return prev + 1;
      } else {
        checkAnswers();
        setShowGameOver(true);
        return prev;
      }
    });
  };

  useEffect(() => {
    if (!showGameOver) {
      setLoading(true);
      fetch("https://opentdb.com/api.php?amount=5&difficulty=easy")
        .then((res) => res.json())
        .then((data) => {
          console.log(data.results);
          setQuestions(
            data.results.map((result) => {
              return {
                ...result,
                answers: shuffleAnswers(
                  result.incorrect_answers,
                  result.correct_answer
                ),
              };
            })
          );

          setLoading(false);
        });
    }
  }, [showGameOver]);

  const override = css`
    display: block;
    margin: 0 auto;
  `;

  return (
    <div className="App">
      <Popup
        closeOnDocumentClick={false}
        open={showGameOver}
        onClose={() => setShowGameOver(false)}
      >
        <h1 className="game-over">Game Over</h1>
        <p className="score">
          Your score is {score} / {questions.length}
        </p>
        <button className="play-again btn-primary" onClick={handlePlayAgain}>
          Play Again
        </button>
      </Popup>
      <h1 className="heading">React Trivia</h1>
      <div className="trivia-container">
        {!loading ? (
          <QuestionCard
            currentIndex={currentIndex}
            incrementScore={incrementScore}
            setUserAnswers={setUserAnswers}
            currentQuestion={questions[currentIndex]}
          />
        ) : (
          <ClipLoader loading={loading} css={override} size={150} />
        )}
        <div className="buttons">
          <button className="btn-primary" onClick={handlePrev}>
            Prev
          </button>
          <button className="btn-primary" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
