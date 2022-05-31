import { getVerbScripts } from "./questions"

export function getQuestionList(task:any) {
  let setOfPossibleQuestions = getVerbScripts()[task.verb][task.tense][task.form]
  return setOfPossibleQuestions
}

export function getVerbList():string[] {
  let verbs = Object.keys(getVerbScripts())
  return verbs
}

export function getTenseList(verb:string):string[] {
  let tenses = Object.keys(getVerbScripts()[verb])
  return tenses
}

export function getFormList(verb:string, tense:string):string[] {
  let forms = Object.keys(getVerbScripts()[verb][tense])
  return forms
}
