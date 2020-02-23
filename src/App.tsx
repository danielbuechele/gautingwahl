import React, { useState } from "react";
import "./App.css";
import Menubar from "./Menubar";
import Game from "./Game";
import Card from "./Card";

type Screen = "START" | "GAME" | "RESULTS";

function App() {
  const [screen, setScreen] = useState<Screen>("START");
  return (
    <div className="App">
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
      {screen === "GAME" && <Game onFinished={console.log} />}
    </div>
  );
}

export default App;
