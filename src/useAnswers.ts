import { Answer } from "./types";
import { useCallback, useState, useEffect } from "react";

export function useAnswer(
  question: number
): [Answer, (answer: Answer) => void] {
  const [state, setState] = useState<Answer>(Answer.NEUTRAL);
  const key = `question${question}`;
  useEffect(() => {
    const value = sessionStorage.getItem(key) as keyof typeof Answer | null;
    let answer = Answer.NEUTRAL;
    if (value !== null) {
      answer = Answer[value];
    }
    setState(answer);
  }, [key]);

  const setAnswer = useCallback(
    (answer: Answer) => {
      sessionStorage.setItem(key, Answer[answer]);
      setState(answer);
    },
    [key]
  );
  return [state, setAnswer];
}

export function useAnswers(): [Answer[], () => void] {
  const answers = Object.keys(sessionStorage)
    .filter(key => /question\d+/.test(key))
    .map(key => parseInt(key.replace("question", ""), 10))
    .reduce((acc, key) => {
      const value = sessionStorage.getItem(
        `question${key}`
      ) as keyof typeof Answer;
      acc[key] = Answer[value];
      return acc;
    }, [] as Answer[]);

  const clearAnswers = useCallback(() => {
    sessionStorage.clear();
  }, []);

  return [answers, clearAnswers];
}
