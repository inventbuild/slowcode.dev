import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { SEQUENCES, PUNCHES, IDLE_TIMEOUT, TYPING_DELAY } from "./constants";

type Modes = "demo" | "stopped" | "waiting";

function selectRandomSequence() {
  return SEQUENCES[Math.floor(Math.random() * SEQUENCES.length)];
}

export default function useDemoMode() {
  const idleTimeoutRef = useRef<number | null>(null);
  const typingTimeoutRef = useRef<number | null>(null);
  const [mode, setMode] = useState<Modes>("demo");
  const [currentText, setCurrentText] = useState<string>("");
  const currentTargetString = useRef<string>(SEQUENCES[0]);
  const currentTypingIndex = useRef<number>(0);

  function startIdleTimer() {
    idleTimeoutRef.current = window.setTimeout(() => {
      // restart demo mode
      startDemo();
    }, IDLE_TIMEOUT);
  }

  function cancelIdleTimer() {
    if (idleTimeoutRef.current !== null) {
      clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = null;
    }
  }

  function startTypingTimer() {
    // console.log("startTypingTimer");
    typingTimeoutRef.current = window.setTimeout(() => {
      // add next character to current string
      setCurrentText(
        (currentText) =>
          currentText +
          currentTargetString.current.charAt(currentTypingIndex.current),
      );
      currentTypingIndex.current++;
      if (currentTypingIndex.current < currentTargetString.current.length) {
        // schedule next char
        cancelTypingTimer();
        startTypingTimer();
      } else {
        cancelTypingTimer();
        startWaiting();
      }
    }, TYPING_DELAY);
  }

  function cancelTypingTimer() {
    if (typingTimeoutRef.current !== null) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
  }

  function startDemo(whichSequence?: number) {
    // console.log("startDemo");

    setMode("demo");
    // initiate 'typing' animation
    if (whichSequence !== undefined)
      currentTargetString.current = SEQUENCES[whichSequence];
    else currentTargetString.current = selectRandomSequence();
    setCurrentText(currentTargetString.current[0]);
    currentTypingIndex.current = 0;
    cancelTypingTimer();
    startTypingTimer();
  }

  function stopDemo() {
    setMode("stopped");
    cancelIdleTimer();
    cancelTypingTimer();
  }

  function startWaiting() {
    setMode("waiting");
    startIdleTimer();
  }

  function updateText(e: ChangeEvent<HTMLTextAreaElement>) {
    // console.log("useDemoMode > updateText > ", e.currentTarget.value);
    setCurrentText(
      e.currentTarget.value
        .toUpperCase()
        .slice(0, 80)
        .split("")
        .filter((c) => c in PUNCHES)
        .join(""),
    );
  }

  return {
    mode,
    startDemo,
    stopDemo,
    startWaiting,
    currentText,
    updateText,
  };
}
