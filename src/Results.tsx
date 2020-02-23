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
    .sort((a, b) => a.percentage - b.percentage);

  return (
    <>
      <ContentCard className="Results">
        <h2>Ergebnis</h2>
        <ol>
          {results.map(({ party, percentage }) => (
            <li key={party} className="ResultRow">
              <img src={LOGOS.get(party)} alt={`Logo ${party}`} width="40" />
              <strong>{party}</strong>
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
                {i + 1}. {q.question}
              </h3>
              <ul>
                <li>
                  <AnswerEmoji value={answers[i]} />
                  &nbsp;
                  <strong>Deine Stimme</strong>
                </li>
                {Object.values(Party).map(party => (
                  <li
                    key={party}
                    className={
                      q.answers[party].answer !== answers[i] ? "different" : ""
                    }
                  >
                    <div>
                      <AnswerEmoji value={q.answers[party].answer} />
                      &nbsp;
                      {party}
                      <div className="spacer" />
                      {q.answers[party].explanaition && (
                        <button className="explain" onClick={() => {}}>
                          Erklärung
                        </button>
                      )}
                    </div>
                    <p>{q.answers[party].explanaition}</p>
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
