import baseApi from './base-service'
import {getQuestion} from "./question-service";

const START_STATE_ID = 'stateId_0'

export async function testAutomaton(questionId, automatonData) {

  try {
    const res = testAutomatonData(questionId, automatonData);
    // const res = await baseApi.post(`/test/automaton/${questionId}`, automatonData);
    return res;
  } catch (error) {
    console.log(error);
  }

}


async function testAutomatonData(questionId, automatonData) {
  let question = await getQuestion(questionId);

  let states = automatonData.states
  let transitions = automatonData.transitions

  let sequenceResultList = []

  outer: for (let seq of question.sequences) {
    let sequenceResult = {sequenceId: seq.id, result: false, stateOrderList: [START_STATE_ID], transitionOrderList: []};
    let currentStateId = START_STATE_ID
    sequenceResultList.push(sequenceResult)

    for (let c of seq.value) {
      let matchTransition = transitions.find(t => t.fromStateId == currentStateId && t.inputs.includes(c));

      // 入力に対する遷移がない場合、誤り
      if (!matchTransition)
        continue outer

      currentStateId = matchTransition.toStateId
      sequenceResult.stateOrderList.push(currentStateId)
      sequenceResult.transitionOrderList.push(matchTransition.id)
    }

    let finishedState = states.find(s => s.id === currentStateId)
    let res = seq.accept == finishedState.accept
    sequenceResult.result = res

  }

  return sequenceResultList

}
