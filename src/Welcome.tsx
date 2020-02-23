import React, { useCallback } from "react";
import Card from "./Card";
import { Screen } from "./types";
import useThrowawayCard from "./useThrowawayCard";
import { Party } from "./types";
import { useHistory } from "react-router-dom";
import { useAnswers } from "./useAnswers";

export default function Welcome(props: { total: number }) {
  const history = useHistory();
  const [, clearAnswers] = useAnswers();
  const onNext = useCallback(() => {
    clearAnswers();
    history.push(Screen.QUESTION + "/1");
  }, [clearAnswers, history]);
  const { handlers, style } = useThrowawayCard({
    onNext,
    width: 400,
    height: 500,
    threshold: 80
  });

  const restart = sessionStorage.getItem("question0") !== null;

  return (
    <Card {...handlers} style={style}>
      <h2>Willkommen</h2>
      <p>
        Beim Themen-Check des Jugendbeirats zur Kommunalwahl 2020 in Gauting
        kannst du {props.total} Thesen beantworten und sehen mit welcher der{" "}
        {Object.keys(Party).length} Parteien du am meisten übereinstimmst.
      </p>
      <div>
        <button onClick={onNext} className="primary">
          {restart ? "Neustarten" : "Los geht's"}
        </button>
        {restart && (
          <button onClick={() => history.push(Screen.RESUTLS)}>Ergebnis</button>
        )}
      </div>
    </Card>
  );
}
