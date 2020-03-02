import React from "react";
import { Answer } from "./types";

export default function AnswerEmoji(props: { value: Answer }) {
  if (props.value === Answer.POSITIVE) {
    return <img alt="stimme zu" className="emoji" src="/emoji_thumbs-up.png" />;
  } else if (props.value === Answer.NEGATIVE) {
    return (
      <img
        alt="stimme nicht zu"
        className="emoji"
        src="/emoji_thumbs-down.png"
      />
    );
  } else {
    return <img alt="neutral" className="emoji" src="/emoji_shrug.png" />;
  }
}
