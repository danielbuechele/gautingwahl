import fetch from "node-fetch";
import fs from "fs-extra";
import path from "path";
import { Data, Party, Answer, Tag, AnswerGroup } from "../src/types";
const GOOGLE_SHEET = "1NDsL-MS7z2kELEdHZaEFDNz27mOlyecTVxkGVF6bASI";

(async () => {
  if (!process.env.REACT_APP_GOOGLE_API_KEY) {
    throw new Error("REACT_APP_GOOGLE_API_KEY is not set as env var");
  }
  const result = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET}/values/Tabellenblatt1!A1:Z10000?key=${process.env.REACT_APP_GOOGLE_API_KEY}`
  ).then(res => res.json());

  const data: Data = {
    questions: result.values.slice(1).map(([q, tags, ...rest]: string[]) => {
      const answers = Object.values(Party).reduce((acc, party, i) => {
        let explanation = rest[i] || "=";
        let answer = Answer.NEUTRAL;
        if (explanation[0] === "+") {
          answer = Answer.POSITIVE;
        } else if (explanation[0] === "-") {
          answer = Answer.NEGATIVE;
        } else if (explanation[0] === "=") {
          answer = Answer.NEUTRAL;
        } else {
          throw new Error(`Wrong answer at ${party} question ${i}`);
        }
        explanation = explanation.substring(1).trim();

        acc[party] = {
          answer,
          explanation
        };
        return acc;
      }, {} as AnswerGroup);

      return {
        question: q,
        tags: tags.split(",").map(t => Tag[t.trim()]),
        answers
      };
    })
  };

  fs.writeJSON(path.join(__dirname, "..", "src", "data.json"), data);
})();
