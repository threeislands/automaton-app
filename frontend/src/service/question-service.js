import baseApi from './base-service'

export async function getQuestion(questionId) {

  try {
    const res = await baseApi.get(`/question/${questionId}`);
    return res.data;
  } catch (error) {
  }

}