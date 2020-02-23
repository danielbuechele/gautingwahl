import React from "react";
import "./Card.css";

function Card(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) {
  const { children, className, ...rest } = props;
  return (
    <div className={`Card ${className}`} {...rest}>
      {props.children}
    </div>
  );
}

export default Card;
