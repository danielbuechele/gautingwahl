import fetch from "node-fetch";
import fs from "fs-extra";
import path from "path";
import { Data, Party, Answer, Tag } from "../src/types";
const GOOGLE_SHEET = "1NDsL-MS7z2kELEdHZaEFDNz27mOlyecTVxkGVF6bASI";

(async () => {
  if (!process.env.REACT_APP_GOOGLE_API_KEY) {
    throw new Error("REACT_APP_GOOGLE_API_KEY is not set as env var");
  }
  const result = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET}/values/A1:Z10000?key=${process.env.REACT_APP_GOOGLE_API_KEY}`
  ).then(res => res.json());

  const data: Data = {
    questions: result.values.slice(1).map(([q, tags, ...rest]: string[]) => {
      return {
        question: q,
        tags: [Tag.FINANZEN, Tag.BAUEN_WOHNEN], //tags.split(",").map(t => t.trim()),
        answers: {
          [Party.CSU]: {
            answer: Answer.POSITIVE,
            explaination: "test"
          }
        }
      };
    })
  };

  fs.writeJSON(path.join(__dirname, "..", "src", "data.json"), data);
})();
