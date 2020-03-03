import React, { useCallback } from "react";
import "./Game.css";
import GameCard from "./GameCard";
import AnswerEmoji from "./AnswerEmoji";
import { Answer, Data, Screen } from "./types";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useAnswer } from "./useAnswers";
import log from "./log";

export default function Game(props: { data: Data }) {
  const total = props.data.questions.length;
  const match = useRouteMatch<{ id: string }>(Screen.QUESTION + "/:id");
  const currentQuestion = parseInt(match?.params.id || "1", 10) - 1;
  const [answer, setAnswer] = useAnswer(currentQuestion);
  const history = useHistory();
  const onNext = useCallback(
    (answer: Answer) => {
      setAnswer(answer);
      log("answer", {
        question: currentQuestion,
        result: Answer[answer]
      });
      if (currentQuestion < total - 1) {
        history.push(Screen.QUESTION + `/${currentQuestion + 2}`);
      } else {
        log("finished");
        history.push(Screen.WEIGHT);
      }
    },
    [setAnswer, currentQuestion, total, history]
  );

  return (
    <>
      <GameCard
        key={`question${currentQuestion}`}
        onNext={onNext}
        number={currentQuestion + 1}
        total={total}
        question={props.data.questions[currentQuestion].question}
        tags={props.data.questions[currentQuestion].tags}
        value={answer}
      />
      <button
        className="neutral"
        onClick={() => {
          setAnswer(Answer.NEUTRAL);
          setTimeout(() => onNext(Answer.NEUTRAL), 300);
        }}
      >
        <AnswerEmoji value={Answer.NEUTRAL} />
        &nbsp; Neutral
      </button>
    </>
  );
}
