import { useSwipeable, EventData } from "react-swipeable";
import { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { Answer } from "./types";
import useIsMounted from "./useIsMounted";

type Result = null | Answer.POSITIVE | Answer.NEGATIVE;

function clamp(num: number, min: number, max: number): number {
  return num <= min ? min : num >= max ? max : num;
}

function getRotation(deltaX: number, threshold: number): number {
  const maxRotation = 4;
  const p = clamp(deltaX / threshold, -1, 1);
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

export default function useThrowawayCard(config: {
  onNext: (answer: Answer) => void;
  threshold: number;
  width: number;
  height: number;
}) {
  const [deltaX, setDeltaX] = useState(0);
  const [deltaY, setDeltaY] = useState(0);
  const [swipeEvent, setSwipeEvent] = useState<EventData | null>(null);
  const [translateDuration, setTranslateDuration] = useState(200);
  const [isSwiping, setIsSwiping] = useState(false);
  const [result, setResult] = useState<Result>(null);
  useEffect(() => {
    const onBlur = () => {
      setResult(null);
      setDeltaX(0);
      setDeltaY(0);
      setIsSwiping(false);
    };
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  const isMounted = useIsMounted();

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
      if (Math.abs(deltaX) > config.threshold) {
        setResult(deltaX < 0 ? Answer.POSITIVE : Answer.NEGATIVE);
      } else {
        setResult(null);
      }
    },
    onSwiped: e => {
      setSwipeEvent(e);
      setIsSwiping(false);
    }
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useLayoutEffect(() => {
    if (!swipeEvent) {
      return;
    }
    setSwipeEvent(null);
    if (result === null) {
      setDeltaX(0);
      setDeltaY(0);
    } else {
      // assuming card is in the middle of screen
      const y = window.innerHeight / 2 + config.height / 2;
      const x = window.innerWidth / 2 + config.width / 2;

      const distanceSoFar = length(swipeEvent.deltaX, swipeEvent.deltaY);
      const distanceTotal = length(x, y);
      const multiplier = distanceTotal / distanceSoFar;

      setDeltaX(deltaX * multiplier);
      setDeltaY(deltaY * multiplier);

      const timeSoFar = 1 / (swipeEvent.velocity / distanceSoFar);
      const timeLeft = Math.min(750, timeSoFar * multiplier - timeSoFar);

      setTranslateDuration(timeLeft);

      setTimeout(() => {
        config.onNext(result);
      }, timeLeft);
    }
  }, [swipeEvent, result, deltaX, deltaY, config]);

  const setResultProgrammatically = useCallback(
    (answer: Answer.POSITIVE | Answer.NEGATIVE) => {
      setResult(answer);
      setTimeout(() => {
        const direction = answer === Answer.POSITIVE ? 1 : -1;
        setDeltaX(direction * (window.innerWidth / 2 + config.width));
        setTranslateDuration(500);
        setTimeout(() => config.onNext(answer), 500);
      }, 300);
    },
    [config]
  );

  const style = {
    transform: `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) rotate(${getRotation(
      deltaX,
      config.threshold
    )}deg) scale(${isMounted ? 1 : 0.3})`,
    transition: getTransitions([
      { property: "box-shadow", duration: 200 },
      { property: "transform", duration: isSwiping ? 0 : translateDuration },
      { property: "opacity", duration: 500 },
      { property: "scale", duration: 500 }
    ])
  };

  return { handlers, style, isSwiping, result, setResultProgrammatically };
}
