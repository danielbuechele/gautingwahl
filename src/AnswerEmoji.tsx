import React from "react";
import { Answer } from "./types";

export default function AnswerEmoji(props: { value: Answer }) {
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
