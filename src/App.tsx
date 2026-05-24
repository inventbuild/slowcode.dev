import { useRef, useLayoutEffect, useState, useEffect } from "react";
import "./App.css";
import useDemoMode from "./useDemoMode";
import {
  PUNCHES,
  PUNCHES_START_X,
  PUNCHES_Y_OFFSET,
  COLUMN_SPACER,
  ROW_Y_POS,
  FONT_MIN,
  FONT_MAX,
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
      key={`${row}${column}`}
    />
  );
}

function App() {
  const [fontSize] = useState(FONT_MAX);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { startDemo, stopDemo, startWaiting, currentText, updateText } =
    useDemoMode();

  useEffect(() => {
    startDemo(0);
    return () => {
      stopDemo();
    };
  }, []);

  // BigMailer signup
  useEffect(() => {
    const t = window.setTimeout(() => {
      (window as any)._bmxq = (window as any)._bmxq || [];
      (window as any)._bmxq.push([
        "_setupForm",
        "form[45904d11-dea0-4568-9119-b5d4600b195e]",
        false,
      ]);
      if (document.querySelector('script[src*="cdn.bigmailer.io/lib.js"]'))
        return;
      const s = document.createElement("script");
      s.src = "https://cdn.bigmailer.io/lib.js";
      s.async = true;
      document.body.appendChild(s);
    }, 0);
    return () => clearTimeout(t);
  }, []);

  function fitFontSize() {
    const el = inputRef.current;
    if (!el) return;

    let size = FONT_MAX;
    el.style.fontSize = `${size}px`;

    while (size > FONT_MIN && el.scrollHeight > el.clientHeight) {
      size -= 1;
      el.style.fontSize = `${size}px`;
    }
  }

  useLayoutEffect(() => {
    fitFontSize();
  }, [currentText]);

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

  return (
    <>
      <section id="hero">
        <div className="hero">
          <textarea
            rows={2}
            id="punch-input"
            value={currentText}
            onChange={updateText}
            ref={inputRef}
            style={
              {
                fontSize,
              } as React.CSSProperties
            }
            onFocus={onInputFocus}
            onBlur={onInputBlur}
          ></textarea>

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
                strokeWidth="3"
              />
              <text x={PUNCHES_START_X} y="30" fontSize="31">
                {currentText}
              </text>
            </g>
            <g id="punches">{getPunchRects()}</g>
          </svg>
        </div>
      </section>
      <section id="info">
        <h1>A monthly meetup to practice coding by hand</h1>
        <p>
          Slow Code is a monthly get-together where we explicitly avoid using
          LLMs to generate code for us.
        </p>
        <p>
          The idea is extremely simple: don't forget what it's like to do it by
          hand.
        </p>
        <h2>Sign up</h2>
        <p>
          If you're interested in this sort of thing, add your email address.
          This will only be used for information on meeting up. I promise I
          would rather commit seppuku than use your email address for anything
          else.
        </p>
        <form
          id="form[45904d11-dea0-4568-9119-b5d4600b195e]"
          method="POST"
          action="https://app.bigmailer.io/t/f/45904d11-dea0-4568-9119-b5d4600b195e"
          data-style="plain"
        >
          <p>
            <br />
            <input
              className="emailSignup"
              type="email"
              name="field[a793a245-c7b0-4459-89d0-40af49564cdc]"
              placeholder="your@email.address"
              id="field[a793a245-c7b0-4459-89d0-40af49564cdc]"
              required
            />
            <button
              id="button[45904d11-dea0-4568-9119-b5d4600b195e]"
              type="submit"
              className="submitButton"
            >
              Subscribe
            </button>
          </p>
          <p
            id="success[45904d11-dea0-4568-9119-b5d4600b195e]"
            style={{ display: "none", color: "green" }}
          >
            Thank you for joining our mailing list!
          </p>
        </form>
      </section>
      <section id="info">
        <h2>About This Site</h2>
        <p>
          It would be pretty lame to have generated this site by LLM, so I
          hand-coded it from scratch (well, from the Vite React boilerplate).
          And in case you didn't already notice, the header is an input field
          that you can type whatever you want in.
        </p>
        <p>
          The punch card is an{" "}
          <a href="https://americanhistory.si.edu/collections/object/nmah_904248">
            IBM 5081
          </a>
          . The encoding works{" "}
          <a href="https://homepage.divms.uiowa.edu/%7Ejones/cards/codes.html">
            like this
          </a>
          . The font is{" "}
          <a href="https://fontlibrary.org/en/font/keypunch029">Keypunch029</a>,
          the <i>exact</i> same font used for this punch card.
        </p>
        <p></p>
      </section>
      <section id="footer" style={{ marginBottom: "40px" }}>
        <>
          By <a href="https://tedbot.com">Ted Hayes</a> and{" "}
          <a href="https://inventbuild.studio/">InventBuild.Studio</a>
        </>
      </section>
    </>
  );
}

export default App;
