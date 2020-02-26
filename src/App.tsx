import React from "react";
import "./App.css";
import Menubar from "./Menubar";
import Game from "./Game";
import Results from "./Results";
import { Data, Screen } from "./types";
import Welcome from "./Welcome";
import Info from "./Info";
import { Switch, Route, useLocation } from "react-router-dom";
import Weight from "./Weigth";
import log from "./log";
const data: Data = require("./data.json");

function App() {
  const location = useLocation();
  React.useEffect(() => log("pageView"), [location]);

  return (
    <div className="App">
      <Menubar />
      <Switch>
        <Route path={Screen.INFO}>
          <Info />
        </Route>
        <Route path={Screen.RESUTLS}>
          <Results data={data} />
        </Route>
        <Route path={Screen.QUESTION}>
          <Game data={data} />
        </Route>
        <Route path={Screen.WEIGHT}>
          <Weight />
        </Route>
        <Route path={Screen.START}>
          <Welcome total={data.questions.length} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
