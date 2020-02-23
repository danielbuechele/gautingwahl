import { useSwipeable, EventData } from "react-swipeable";
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback
} from "react";
import "./GameCard.css";
import { Answer, Tag } from "./types";
import Card from "./Card";

type Result = "GO_BACK" | Answer.POSITIVE | Answer.NEGATIVE;

const THRESHOLD = 80;
const WIDTH = 300;
const HEIGHT = 400;

function clamp(num: number, min: number, max: number): number {
  return num <= min ? min : num >= max ? max : num;
}

function getRotation(deltaX: number): number {
  const maxRotation = 4;
  const p = clamp(deltaX / THRESHOLD, -1, 1);
  return p * maxRotation;
}

function length(x: number, y: number) {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function getTransitions(
  transitions: Array<{ property: string; duration: number }>
): string {
  return transitions
    .map(({ property, duration }) => `${property} ${duration}ms`)
    .join(", ");
}

export default function GameCard(props: {
  number: number;
  total: number;
  question: string;
  tags: Tag[];
  onNext: (answer: Answer) => void;
}) {
  const { onNext } = props;
  const [isMounted, setIsMounted] = useState(false);
  const [deltaX, setDeltaX] = useState(0);
  const [deltaY, setDeltaY] = useState(0);
  const [swipeEvent, setSwipeEvent] = useState<EventData | null>(null);
  const [translateDuration, setTranslateDuration] = useState(200);
  const [isSwiping, setIsSwiping] = useState(false);
  const [result, setResult] = useState<Result>("GO_BACK");
  useEffect(() => {
    setIsMounted(true);
    const onBlur = () => {
      setResult("GO_BACK");
      setDeltaX(0);
      setDeltaY(0);
      setIsSwiping(false);
    };
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  const handlers = useSwipeable({
    delta: 0,
    preventDefaultTouchmoveEvent: false,
    trackTouch: true,
    trackMouse: true,
    rotationAngle: 0,
    onSwiping: ({ deltaX, deltaY }) => {
      setDeltaX(deltaX * -1);
      setDeltaY(deltaY * -1);
      setIsSwiping(true);
      if (Math.abs(deltaX) > THRESHOLD) {
        setResult(deltaX < 0 ? Answer.POSITIVE : Answer.NEGATIVE);
      } else {
        setResult("GO_BACK");
      }
    },
    onSwiped: e => {
      setSwipeEvent(e);
      setIsSwiping(false);
    }
  });

  useLayoutEffect(() => {
    if (!swipeEvent) {
      return;
    }
    setSwipeEvent(null);
    if (result === "GO_BACK") {
      setDeltaX(0);
      setDeltaY(0);
    } else {
      // assuming card is in the middle of screen
      const y = window.innerHeight / 2 + HEIGHT / 2;
      const x = window.innerWidth / 2 + WIDTH / 2;

      const distanceSoFar = length(swipeEvent.deltaX, swipeEvent.deltaY);
      const distanceTotal = length(x, y);
      const multiplier = distanceTotal / distanceSoFar;

      setDeltaX(deltaX * multiplier);
      setDeltaY(deltaY * multiplier);

      const timeSoFar = 1 / (swipeEvent.velocity / distanceSoFar);
      const timeLeft = Math.min(750, timeSoFar * multiplier - timeSoFar);

      setTranslateDuration(timeLeft);

      setTimeout(() => {
        onNext(result);
      }, timeLeft);
    }
  }, [swipeEvent, onNext, result, deltaX, deltaY]);

  const onButtonClick = useCallback(
    (answer: Answer.POSITIVE | Answer.NEGATIVE) => {
      setResult(answer);
      setTimeout(() => {
        const direction = answer === Answer.POSITIVE ? 1 : -1;
        setDeltaX(direction * (window.innerWidth / 2 + WIDTH));
        setTranslateDuration(500);
        setTimeout(() => onNext(answer), 500);
      }, 300);
    },
    [onNext]
  );

  const style = {
    width: WIDTH,
    height: HEIGHT,
    left: `calc(50% - ${WIDTH / 2}px)`,
    top: `calc(50% - ${HEIGHT / 2}px)`,
    transform: `translate(${deltaX}px,${deltaY}px) rotate(${getRotation(
      deltaX
    )}deg) scale(${isMounted ? 1 : 0.3})`,
    transition: getTransitions([
      { property: "box-shadow", duration: 200 },
      { property: "transform", duration: isSwiping ? 0 : translateDuration },
      { property: "opacity", duration: 500 },
      { property: "scale", duration: 500 }
    ]),
    opacity: isMounted ? 1 : 0
  };

  return (
    <Card
      className={`GameCard ${isSwiping ? "swiping" : ""}`}
      {...handlers}
      style={style}
    >
      <div className="info">
        Frage {props.number} von {props.total}
      </div>
      <div className="question">
        <p>{props.question}</p>
        {props.tags.map(t => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>
      <div>
        <button
          onClick={() => onButtonClick(Answer.NEGATIVE)}
          className={result === Answer.NEGATIVE ? "negative-active" : ""}
        >
          <span role="img" aria-label="Stimme nicht zu">
            👎
          </span>
        </button>
        <button
          onClick={() => onButtonClick(Answer.POSITIVE)}
          className={result === Answer.POSITIVE ? "positive-active" : ""}
        >
          <span role="img" aria-label="Stimme zu">
            👍
          </span>
        </button>
      </div>
    </Card>
  );
}
