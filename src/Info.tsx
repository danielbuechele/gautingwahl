import React from "react";
import ContentCard from "./ContentCard";
import "./Info.css";
import { Party } from "./types";

export default function Info() {
  return (
    <>
      <ContentCard className="Info">
        <h2>Informationen</h2>
        <img
          className="photo"
          src="/jugendbeirat.jpg"
          alt="Jugendbeirat 2019"
        />
        <p>
          GautingWahl.de wird vom{" "}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.gauting.de/rathaus-und-verwaltung/kommunale-politik/jugendreferenten/"
          >
            Jugendbeirat
          </a>{" "}
          der Gemeinde Gauting zur Kommunalwahl 2020 bereit gestellt und soll
          Wähler*innen dabei helfen zu sehen mit welcher Partei sie die größte
          Übereinstimmung haben. Natürlich sollte aber die Wahlentscheidung
          nicht nur auf Grund des Ergebnis des Themenchecks getroffen werden.
        </p>
        <p>
          Alle sieben Parteien und Listen, die bei der Kommunalwahl zum
          Gautinger Gemeinderat antreten haben für den Themencheck ihre
          Positionen zu unseren Thesen eingereicht.
        </p>
        <p className="logos">
          {Object.keys(Party).map((key, i) => (
            <div className="logo">
              <img src={`/party${i}.svg`} alt={`Logo ${key}`} />
            </div>
          ))}
        </p>
      </ContentCard>
      <ContentCard className="Info">
        <h2>Impressum</h2>
        <p>Verantwortlich für den Inhalt gemäß §55 Abs. 2 RStV:</p>
        <p>
          <strong>Jugendbeirat der Gemeinde Gauting</strong>
          <br />
          Gabriel Knoll
          <br />
          Bahnhofstr. 7<br />
          82131 Gauting
          <br />
          <a href="mailto:post.jugendbeirat@gauting.de">
            post.jugendbeirat@gauting.de
          </a>
        </p>
      </ContentCard>
    </>
  );
}
