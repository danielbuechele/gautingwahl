import React from "react";
import { NavLink, useRouteMatch, useHistory } from "react-router-dom";
import { Screen } from "./types";

import "./Menubar.css";

function Menubar() {
  const history = useHistory();
  const match = useRouteMatch(Screen.INFO);
  const isInfoScreen = match?.path === Screen.INFO;

  return (
    <div className="Menubar">
      <NavLink to={Screen.START}>
        <h1>
          GautingWahl<em>2020</em>
        </h1>
      </NavLink>

      {isInfoScreen ? (
        <button className="nav" onClick={() => history.goBack()}>
          zurück
        </button>
      ) : (
        <NavLink className="nav" to={Screen.INFO}>
          Infos
        </NavLink>
      )}
    </div>
  );
}

export default Menubar;
