import React, { useState, useCallback } from "react";
import "./Weight.css";
import ContentCard from "./ContentCard";
import { Tag, Screen } from "./types";
import { useHistory } from "react-router-dom";

const MAX_WEIGHTS = 3;

export default function Weight() {
  const history = useHistory();
  const [priorities, setPriorities] = useState<Set<Tag>>(new Set());

  const togglePriority = useCallback(
    (tag: Tag) => {
      const newPriorities = new Set(Array.from(priorities.values()));
      if (!newPriorities.has(tag) && newPriorities.size < MAX_WEIGHTS) {
        newPriorities.add(tag);
      } else {
        newPriorities.delete(tag);
      }
      setPriorities(newPriorities);
    },
    [priorities]
  );

  return (
    <ContentCard className="Weight">
      <h2>Gewichtung</h2>
      <p>
        Wähle bis zu {MAX_WEIGHTS} Themen aus die dir besonders wichtig sind.
        Übereinstimmungen in diesen Themen werden doppelt gewertet.
      </p>
      <ul>
        {Object.values(Tag).map(tag => (
          <li>
            <button
              onClick={() => togglePriority(tag)}
              className={priorities.has(tag) ? "active" : ""}
            >
              {tag}
            </button>
          </li>
        ))}
      </ul>
      <button className="primary" onClick={() => history.push(Screen.RESUTLS)}>
        Zum Ergebnis
      </button>
    </ContentCard>
  );
}
