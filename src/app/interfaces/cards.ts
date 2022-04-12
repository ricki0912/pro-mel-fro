import { ParentInterface } from "../global/parents/parent.interface";

export interface Cards extends ParentInterface{
  cardId?: number,
  cardName?: string,
  cardPhrases?: string,
  cardState?: string
}
