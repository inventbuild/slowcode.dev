import {
  useRef,
  useLayoutEffect,
  useState,
  type ChangeEvent,
  useEffect,
} from "react";
import "./App.css";
import useDemoMode from "./useDemoMode";
import {
  PUNCHES,
  PUNCHES_START_X,
  PUNCHES_Y_OFFSET,
  COLUMN_SPACER,
  ROW_Y_POS,
} from "./constants";

function rcToPunchRect(row: number, column: number) {
  // takes row and column coordinates and returns Punch svg rect
  // rows are numbered 12, 11, 0, 1, 2, 3...
  return (
    <rect
      x={PUNCHES_START_X + column * COLUMN_SPACER}
      y={ROW_Y_POS[row] + PUNCHES_Y_OFFSET}
      width="11"
      height="24"
      fill="black"
      key={`${row}${column}`}
    />
  );
}

const FONT_MIN = 20;
const FONT_MAX = 120;

function App() {
  const [fontSize, setFontSize] = useState(FONT_MAX);
  const inputRef = useRef<HTMLInputElement>(null);
  const { mode, startDemo, stopDemo, startWaiting, currentText, updateText } =
    useDemoMode();

  useEffect(() => {
    startDemo(0);
    return () => {
      stopDemo();
    };
  }, []);

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
  }, [currentText]);

  // function updateText(e: ChangeEvent<HTMLInputElement>) {
  //   setText(
  //     e.currentTarget.value
  //       .toUpperCase()
  //       .slice(0, 80)
  //       .split("")
  //       .filter((c) => c in PUNCHES)
  //       .join(""),
  //   );
  // }

  function getPunchRects() {
    // for each character in text, get a Punch
    return [...currentText]
      .map((char: string, i: number) => {
        const rows = PUNCHES[char];
        return rows.map((r) => rcToPunchRect(r, i));
      })
      .flat();
  }

  function onInputFocus() {
    // get out of demo mode
    stopDemo();
  }

  function onInputBlur() {
    // start demo waiting
    startWaiting();
  }
  console.log("useDemoMode mode: ", mode);

  return (
    <>
      <section id="hero">
        <div className="hero">
          <input
            id="punch-input"
            type="text"
            value={currentText}
            onChange={updateText}
            ref={inputRef}
            style={{ fontSize }}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
          ></input>

          <svg
            width="1392"
            height="613"
            viewBox="0 0 1392 613"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="card-bg" pointerEvents="none">
              <path
                d="M1.5 83L50 1.5H1348C1371 1.5 1390.5 15.5 1390.5 44V563.5C1390.5 598.3 1367.5 611.5 1342.5 611.5H39.5C15 611.5 1.49997 584.5 1.5 572V83Z"
                stroke="black"
                strokeWidth="3"
              />
              <text x={PUNCHES_START_X} y="30" fill="black" fontSize="31">
                {currentText}
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
