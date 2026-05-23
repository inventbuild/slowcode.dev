import { useRef, useLayoutEffect, useState, type ChangeEvent } from "react";
import "./App.css";

const PUNCHES: Record<string, number[]> = {
  " ": [],
  "0": [0],
  "1": [1],
  "2": [2],
  "3": [3],
  "4": [4],
  "5": [5],
  "6": [6],
  "7": [7],
  "8": [8],
  "9": [9],
  A: [12, 1],
  B: [12, 2],
  C: [12, 3],
  D: [12, 4],
  E: [12, 5],
  F: [12, 6],
  G: [12, 7],
  H: [12, 8],
  I: [12, 9],
  J: [11, 1],
  K: [11, 2],
  L: [11, 3],
  M: [11, 4],
  N: [11, 5],
  O: [11, 6],
  P: [11, 7],
  Q: [11, 8],
  R: [11, 9],
  "/": [0, 1],
  S: [0, 2],
  T: [0, 3],
  U: [0, 4],
  V: [0, 5],
  W: [0, 6],
  X: [0, 7],
  Y: [0, 8],
  Z: [0, 9],
};

const PUNCHES_START_X = 50;
const PUNCHES_Y_OFFSET = 0;
const COLUMN_SPACER = 16.37;

const ROW_Y_POS: Record<number, number> = {
  12: 34,
  11: 80,
  0: 128,
  1: 174,
  2: 221,
  3: 268,
  4: 315,
  5: 362,
  6: 409,
  7: 457,
  8: 505,
  9: 551,
};

const SEQUENCES = ["SLOW CODE", "0123456789ABCDEFGHIJKLMNOPQR/STUVWXYZ"];

function rcToPunchRect(row: number, column: number) {
  console.log("rcToPunchRect ", row, column);
  // takes row and column coordinates and returns Punch svg rect
  // rows are numbered 12, 11, 0, 1, 2, 3...
  return (
    <rect
      x={PUNCHES_START_X + column * COLUMN_SPACER}
      y={ROW_Y_POS[row] + PUNCHES_Y_OFFSET}
      width="11"
      height="24"
      fill="black"
    />
  );
}

const FONT_MIN = 20;
const FONT_MAX = 120;

function App() {
  const [text, setText] = useState("SLOW CODE");
  const [fontSize, setFontSize] = useState(FONT_MAX);
  const inputRef = useRef<HTMLInputElement>(null);

  function fitFontSize() {
    const el = inputRef.current;
    if (!el) return;

    let size = FONT_MAX;
    el.style.fontSize = `${size}px`;

    while (size > FONT_MIN && el.scrollWidth > el.clientWidth) {
      size -= 1;
      el.style.fontSize = `${size}px`;
    }
  }

  useLayoutEffect(() => {
    fitFontSize();
  }, [text]);

  function updateText(e: ChangeEvent<HTMLInputElement>) {
    setText(
      e.currentTarget.value
        .toUpperCase()
        .slice(0, 80)
        .split("")
        .filter((c) => c in PUNCHES)
        .join(""),
    );
  }

  function getPunchRects() {
    // for each character in text, get a Punch
    return [...text]
      .map((char: string, i: number) => {
        const rows = PUNCHES[char];
        return rows.map((r) => rcToPunchRect(r, i));
      })
      .flat();
  }

  return (
    <>
      <section id="hero">
        <div className="hero">
          <input
            id="punch-input"
            type="text"
            value={text}
            onChange={updateText}
            ref={inputRef}
            style={{ fontSize }}
          ></input>

          <svg
            width="1392"
            height="613"
            viewBox="0 0 1392 613"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="card-bg" pointer-events="none">
              <path
                d="M1.5 83L50 1.5H1348C1371 1.5 1390.5 15.5 1390.5 44V563.5C1390.5 598.3 1367.5 611.5 1342.5 611.5H39.5C15 611.5 1.49997 584.5 1.5 572V83Z"
                stroke="black"
                stroke-width="3"
              />
              <text x={PUNCHES_START_X} y="30" fill="black" fontSize="31">
                {text}
              </text>
            </g>
            <g id="punches">{getPunchRects()}</g>
          </svg>
        </div>
      </section>
      <section id="info">
        <h1>A monthly meetup to practice coding by hand</h1>
      </section>
    </>
  );
}

export default App;
