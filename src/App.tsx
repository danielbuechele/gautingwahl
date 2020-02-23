import React, { useState } from "react";
import "./App.css";
import Menubar from "./Menubar";
import Game from "./Game";
import Results from "./Results";
import { Answer, Data } from "./types";
import Welcome from "./Welcome";
const data: Data = require("./data.json");

type Screen = "START" | "GAME" | "RESULTS";

function App() {
  const [answers, setAnswers] = useState<Answer[] | null>(null);
  const [screen, setScreen] = useState<Screen>("START");

  return (
    <div className={`App ${screen === "GAME" && "inGame"}`}>
      <Menubar />
      {screen === "START" && (
        <Welcome
          total={data.questions.length}
          onNext={() => setScreen("GAME")}
        />
      )}
      {screen === "RESULTS" && answers && (
        <Results data={data} answers={answers} />
      )}
      {screen === "GAME" && (
        <Game
          data={data}
          onFinished={answers => {
            setAnswers(answers);
            setScreen("RESULTS");
          }}
        />
      )}
    </div>
  );
}

export default App;
