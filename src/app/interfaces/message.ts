export interface Message {
  _id?: string;
  user_id: string;
  chat_id: string;
  verb: string;
  tense: string;
  form: string;
  question_no: number;
  text?: string;
  correct?: boolean;
  errorType?: string;
  feedback?: string;
  timeTaken?: number;
}
