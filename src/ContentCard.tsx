import React from "react";
import "./ContentCard.css";
import Card from "./Card";

export default function ContentCard(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) {
  return (
    <Card className={`${props.className} ContentCard`}>{props.children}</Card>
  );
}
