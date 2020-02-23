import React from "react";
import { Answer, Tag } from "./types";
import Card from "./Card";
import useThrowawayCard from "./useThrowawayCard";
import "./GameCard.css";

export default function GameCard(props: {
  number: number;
  total: number;
  question: string;
  tags: Tag[];
  onNext: (answer: Answer) => void;
}) {
  const { onNext } = props;
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
          className={result === Answer.NEGATIVE ? "negative-active" : ""}
        >
          <span role="img" aria-label="Stimme nicht zu">
            👎
          </span>
        </button>
        <button
          onClick={() => setResultProgrammatically(Answer.POSITIVE)}
          className={result === Answer.POSITIVE ? "positive-active" : ""}
        >
          <span role="img" aria-label="Stimme zu">
            👍
          </span>
        </button>
      </div>
    </Card>
  );
}
