import baseApi from './base-service'

export async function testAutomaton(questionId, automatonData) {

  try {
    const res = await baseApi.post(`/test/automaton/${questionId}`, automatonData);
    return res.data;
  } catch (error) {
    console.log(error);
  }

}