import React, { useState } from "react";
import "./Weight.css";
import Card from "./Card";
import { Tag } from "./types";

function App() {
  const [priority, setPriority] = useState();
  return (
    <Card>
      <h2>Gewichtung</h2>
      <p>Welche Themen sind die besonders wichtig?</p>
      <ul>
        {Object.values(Tag).map(tag => (
          <li>
            <button>{tag}</button>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default App;
