import React, { useState, useEffect } from "react";
import "./App.css";
import Menubar from "./Menubar";
import Game from "./Game";
import Card from "./Card";
import Results from "./Results";
import { Answer } from "./types";

type Screen = "START" | "GAME" | "RESULTS";

function App() {
  const [answers, setAnswers] = useState<Answer[] | null>(null);
  const [screen, setScreen] = useState<Screen>("START");

  useEffect(() => {
    if (screen === "GAME") {
      document.body.classList.add("inGame");
    } else {
      document.body.classList.remove("inGame");
    }
  }, [screen]);

  return (
    <div className={`App ${screen === "GAME" && "inGame"}`}>
      <Menubar />
      {screen === "START" && (
        <Card>
          <h2>Willkommen</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            non ante nunc. Maecenas erat tellus, consectetur id urna in,
            suscipit semper velit. Pellentesque non enim quis risus tristique
            vehicula vitae eu nulla. Proin vitae purus ac mauris tincidunt
            sagittis. Nullam sed leo ipsum. Vestibulum convallis augue elementum
            sem vehicula, nec pellentesque dui facilisis. Curabitur eleifend
            vitae mauris ac lacinia.
          </p>
          <button onClick={() => setScreen("GAME")}>Los geht's!</button>
        </Card>
      )}
      {screen === "RESULTS" && answers && <Results answers={answers} />}
      {screen === "GAME" && (
        <Game
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
