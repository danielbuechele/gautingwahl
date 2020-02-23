import React from "react";
import "./Results.css";
import ContentCard from "./ContentCard";
import { Data, Party } from "./types";
import { useAnswers } from "./useAnswers";
import AnswerEmoji from "./AnswerEmoji";

const LOGOS = Object.values(Party).reduce(
  (acc, party, i) => acc.set(party, `/party${i}.svg`),
  new Map<Party, string>()
);

export default function Results(props: { data: Data }) {
  const [answers] = useAnswers();
  const total = props.data.questions.length;

  const results: Array<{
    party: Party;
    percentage: number;
  }> = Object.values(Party)
    .map(party => ({
      party,
      percentage:
        props.data.questions.reduce((sum, q, i) => {
          if (q.answers[party].answer === answers[i]) {
            sum++;
          }
          return sum;
        }, 0) / total
    }))
    .sort((a, b) => b.percentage - a.percentage);

  return (
    <>
      <ContentCard className="Results">
        <h2>Ergebnis</h2>
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
            <li key={i}>
              <h3>
                {i + 1}) {q.question}
              </h3>
              <ul>
                <li className="answer">
                  <AnswerEmoji value={answers[i]} />
                  <strong>Deine Antwort</strong>
                </li>
                {Object.values(Party).map(party => (
                  <li
                    key={party}
                    className={`answer ${
                      q.answers[party].answer !== answers[i] ? "different" : ""
                    }`}
                  >
                    <AnswerEmoji value={q.answers[party].answer} />
                    <div>
                      <strong>{party}</strong>
                      {q.answers[party].explanation && (
                        <span className="explanation">
                          {q.answers[party].explanation}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </ContentCard>
    </>
  );
}
