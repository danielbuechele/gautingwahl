import React from "react";
import { Answer, Tag } from "./types";
import Card from "./Card";
import useThrowawayCard from "./useThrowawayCard";
import "./GameCard.css";
import AnswerEmoji from "./AnswerEmoji";

export default function GameCard(props: {
  number: number;
  total: number;
  question: string;
  tags: Tag[];
  value: Answer;
  onNext: (answer: Answer) => void;
}) {
  const { onNext, value } = props;
  const {
    handlers,
    style,
    isSwiping,
    result,
    setResultProgrammatically
  } = useThrowawayCard({ onNext, threshold: 80, width: 300, height: 400 });

  return (
    <Card
      className={`GameCard ${isSwiping ? "swiping" : ""}`}
      {...handlers}
      style={style}
    >
      <div className="info">
        These {props.number} von {props.total}
      </div>
      <div className="question">
        <p>{props.question}</p>
        {props.tags.map(t => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>
      <div>
        <button
          onClick={() => setResultProgrammatically(Answer.NEGATIVE)}
          className={
            (value === Answer.NEGATIVE && result === null) ||
            result === Answer.NEGATIVE
              ? "negative-active"
              : ""
          }
        >
          <AnswerEmoji value={Answer.NEGATIVE} />
        </button>
        <button
          onClick={() => setResultProgrammatically(Answer.POSITIVE)}
          className={
            (value === Answer.POSITIVE && result === null) ||
            result === Answer.POSITIVE
              ? "positive-active"
              : ""
          }
        >
          <AnswerEmoji value={Answer.POSITIVE} />
        </button>
      </div>
    </Card>
  );
}
