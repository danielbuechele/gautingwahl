import React, { useState, useCallback, useRef } from "react";
import "./Game.css";
import GameCard from "./GameCard";
import { Answer, Data } from "./types";
const data: Data = require("./data.json");

export default function Game(props: {
  onFinished: (answers: Answer[]) => void;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const answers = useRef<Answer[]>([]);
  const total = data.questions.length;
  const { onFinished } = props;

  const onNext = useCallback(
    (answer: Answer) => {
      answers.current[currentQuestion] = answer;
      if (currentQuestion < total - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        onFinished(answers.current);
      }
    },
    [currentQuestion, total, onFinished]
  );
  return (
    <>
      <GameCard
        key={`question${currentQuestion}`}
        onNext={onNext}
        number={currentQuestion + 1}
        total={total}
        question={data.questions[currentQuestion].question}
        tags={data.questions[currentQuestion].tags}
      />
      <button className="skip" onClick={() => onNext(Answer.NEUTRAL)}>
        überspringen
      </button>
    </>
  );
}
