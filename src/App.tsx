import React from "react";
import "./App.css";
import Menubar from "./Menubar";
import Game from "./Game";
import Results from "./Results";
import { Data, Screen } from "./types";
import Welcome from "./Welcome";
import mixpanel from "mixpanel-browser";
import Info from "./Info";
import { Switch, Route, useLocation } from "react-router-dom";
import Weight from "./Weigth";
const data: Data = require("./data.json");

mixpanel.init("4c4511d62e6eb4cf788020022ee93179");
if (process.env.NODE_ENV !== "production") {
  console.info("Mixpanel disabled");
  mixpanel.disable();
}

function App() {
  const location = useLocation();
  React.useEffect(() => {
    mixpanel.track("pageview", {
      page: location.pathname
    });
  }, [location]);

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
