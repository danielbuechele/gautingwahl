import React from "react";
import Card from "./Card";
import useThrowawayCard from "./useThrowawayCard";
import { Party } from "./types";

export default function Welcome(props: { onNext: () => void; total: number }) {
  const { handlers, style } = useThrowawayCard({
    onNext: props.onNext,
    width: 400,
    height: 500,
    threshold: 80
  });
  return (
    <Card {...handlers} style={style}>
      <h2>Willkommen</h2>
      <p>
        Beim Themen-Check des Jugendbeirats zur Kommunalwahl 2020 in Gauting
        kannst du {props.total} Thesen beantworten und sehen mit welcher der{" "}
        {Object.keys(Party).length} Parteien du am meisten übereinstimmst.
      </p>
      <button onClick={props.onNext}>Los geht's!</button>
    </Card>
  );
}
