import React from "react";
import "./Results.css";
import Card from "./Card";
import { Answer, Data, Party } from "./types";

function AnswerEmoji(props: { value: Answer }) {
  if (props.value === Answer.POSITIVE) {
    return (
      <span role="img" aria-label="stimme zu">
        👍
      </span>
    );
  } else if (props.value === Answer.NEGATIVE) {
    return (
      <span role="img" aria-label="stimme nicht zu">
        👎
      </span>
    );
  } else {
    return (
      <span role="img" aria-label="neutral">
        ❓
      </span>
    );
  }
}

const LOGOS = Object.values(Party).reduce(
  (acc, party, i) => acc.set(party, `/party${i}.svg`),
  new Map<Party, string>()
);

export default function Results(props: { answers: Answer[]; data: Data }) {
  const total = props.data.questions.length;

  const results: Array<{
    party: Party;
    percentage: number;
  }> = Object.values(Party)
    .map(party => ({
      party,
      percentage:
        props.data.questions.reduce((sum, q, i) => {
          if (q.answers[party].answer === props.answers[i]) {
            sum++;
          }
          return sum;
        }, 0) / total
    }))
    .sort((a, b) => a.percentage - b.percentage);

  return (
    <Card className="Results">
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
      <h2>Details</h2>
      <ol>
        {props.data.questions.map((q, i) => (
          <li>
            <h3>
              {i + 1}. {q.question}
            </h3>
            <ul>
              <li>
                <AnswerEmoji value={props.answers[i]} />
                &nbsp;
                <strong>Deine Stimme</strong>
              </li>
              {Object.values(Party).map(party => (
                <li
                  className={
                    q.answers[party].answer !== props.answers[i]
                      ? "different"
                      : ""
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
    </Card>
  );
}
