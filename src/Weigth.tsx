import React, { useState, useCallback } from "react";
import "./Weight.css";
import ContentCard from "./ContentCard";
import { Tag, Screen } from "./types";
import { useHistory } from "react-router-dom";

const MAX_WEIGHTS = 3;
const TAG_MAP = Object.entries(Tag).reduce(
  (acc, [k, v]) => acc.set(v, k as any),
  new Map<Tag, keyof typeof Tag>()
);

export function useWeights(): [Set<Tag>, (tag: Tag) => void] {
  const storageKey = "weights";

  type T = keyof typeof Tag;
  const init = (sessionStorage.getItem(storageKey)?.split(",") as
    | T[]
    | undefined)?.map(t => Tag[t]);

  const [weights, _setWeights] = useState<Set<Tag>>(new Set(init));

  const toggleWeight = useCallback(
    (tag: Tag) => {
      const newWeights = new Set(Array.from(weights.values()));
      if (!newWeights.has(tag) && newWeights.size < MAX_WEIGHTS) {
        newWeights.add(tag);
      } else {
        newWeights.delete(tag);
      }

      _setWeights(newWeights);
      sessionStorage.setItem(
        storageKey,
        Array.from(newWeights)
          .map((w: Tag) => TAG_MAP.get(w))
          .join(",")
      );
    },
    [weights]
  );

  return [weights, toggleWeight];
}

export default function Weight() {
  const history = useHistory();
  const [weights, toggleWeight] = useWeights();
  const onFinish = useCallback(() => {
    history.push(Screen.RESUTLS);
  }, [history]);

  return (
    <ContentCard className="Weight">
      <h2>Gewichtung</h2>
      <p>
        Wähle bis zu {MAX_WEIGHTS} Themen aus die dir besonders wichtig sind.
        Übereinstimmungen in diesen Themen werden doppelt gewertet.
      </p>
      <ul>
        {Object.values(Tag).map(tag => (
          <li key={tag}>
            <button
              onClick={() => toggleWeight(tag)}
              className={weights.has(tag) ? "active" : ""}
            >
              {tag}
            </button>
          </li>
        ))}
      </ul>
      <button className="primary" onClick={onFinish}>
        Zum Ergebnis
      </button>
    </ContentCard>
  );
}
