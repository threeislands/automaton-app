import baseApi from './base-service'


export async function getUser() {
  try {
    const res = await baseApi.get(`/user/current_user`);
    return res.data;
  } catch (error) {
    return null;
  }
}

export async function deleteUser() {
  try {
    const res = await baseApi.post(`/user/delete/current_user`);
    return res.data;
  } catch (error) {
    // return null;
  }
}

export async function saveAutomaton(questionId, automaton) {
  try {
    const res = await baseApi.post(`/user/save_automaton/${questionId}`,
      automaton);
    return res.data;
  } catch (error) {
  }
}

export async function loadAutomaton(questionId) {
  try {
    const res = await baseApi.get(`/user/load_automaton/${questionId}`);
    return res.data;
  } catch (error) {
    return null;
  }
}