/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "./Results.css";
import ContentCard from "./ContentCard";
import { Data, Party, Answer, Question } from "./types";
import { useAnswers } from "./useAnswers";
import AnswerEmoji from "./AnswerEmoji";
import log from "./log";
import { useWeights } from "./Weigth";

const LOGOS = Object.values(Party).reduce(
  (acc, party, i) => acc.set(party, `/party${i}.svg`),
  new Map<Party, string>()
);

export default function Results(props: { data: Data }) {
  const [answers] = useAnswers();
  const [weights] = useWeights();
  useEffect(() => {
    log("resultsRendered", { answers, weights: Array.from(weights) });
  }, [answers, weights]);
  const totalAnswered = answers.length;
  const results: Array<{
    party: Party;
    percentage: number;
  }> = Object.values(Party)
    .map(party => {
      let base = totalAnswered;
      return {
        party,
        percentage:
          props.data.questions.reduce((sum, q, i) => {
            const answer = q.answers[party].answer;
            if (answer === answers[i]) {
              if (q.tags.some(t => weights.has(t))) {
                sum += 2;
                base++;
              } else {
                sum++;
              }
            }
            return sum;
          }, 0) / base
      };
    })
    .sort((a, b) => b.percentage - a.percentage);

  return (
    <>
      <ContentCard className="Results">
        <h2>Ergebnis</h2>
        {totalAnswered / props.data.questions.length < 0.5 && (
          <p>
            <span role="img" aria-label="Achtung"></span>⚠️ Du hast weniger als
            die Hälfte der Thesen beantwortet. Daher ist das Ergebnis wenig
            aussagekräftig.
          </p>
        )}
        <ol>
          {results.map(({ party, percentage }) => (
            <li key={party} className="ResultRow">
              <img src={LOGOS.get(party)} alt={`Logo ${party}`} />
              <strong className="partyName">{party}</strong>
              {Math.round(percentage * 100)}%
            </li>
          ))}
        </ol>
      </ContentCard>
      <ContentCard className="Results">
        <h2>Details</h2>
        <ol>
          {props.data.questions.map((q, i) => (
            <QuestionResult
              key={i}
              value={q}
              userAnswer={answers[i]}
              index={i + 1}
            />
          ))}
        </ol>
      </ContentCard>
    </>
  );
}

function QuestionResult(props: {
  value: Question;
  userAnswer: Answer;
  index: number;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const { value, userAnswer, index } = props;

  return (
    <li className={`QuestionResult ${open ? "isOpen" : ""}`}>
      <a onClick={() => setOpen(!open)}>
        <h3>
          {index}) {value.question}
        </h3>
        <span className="icon">⌃</span>
      </a>
      {open && (
        <ul>
          <li className="answer">
            <AnswerEmoji value={userAnswer} />
            <strong>Deine Antwort</strong>
          </li>
          {Object.values(Party).map(party => (
            <li
              key={party}
              className={`answer ${
                value.answers[party].answer !== userAnswer ? "different" : ""
              }`}
            >
              <AnswerEmoji value={value.answers[party].answer} />
              <div>
                <strong>{party}</strong>
                {value.answers[party].explanation && (
                  <span className="explanation">
                    {value.answers[party].explanation}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
