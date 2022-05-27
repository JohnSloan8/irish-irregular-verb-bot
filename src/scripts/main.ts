import { getVerbScripts } from "./questions"

export function getQuestionList(task:any) {
  let setOfPossibleQuestions = getVerbScripts(task.verb, task.tense, task.form)
  return setOfPossibleQuestions
}
