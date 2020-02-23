export enum Party {
  CSU = "CSU",
  GRÜNE = "Grüne",
  SPD = "SPD",
  FDP = "FDP",
  MFG = "MfG/Piraten",
  UBG = "UBG",
  MIFÜ = "MiFü 82131"
}

export enum Tag {
  VERKEHR = "🚗 Verkehr",
  BAUEN_WOHNEN = "🏡 Bauen & Wohnen",
  FINANZEN = "💰 Finanzen"
}

export enum Answer {
  POSITIVE,
  NEGATIVE,
  NEUTRAL
}

export type Data = {
  questions: Array<{
    question: string;
    tags: Tag[];
    answers: {
      [key in Party]: {
        answer: Answer;
        explanaition: string | null;
      };
    };
  }>;
};
