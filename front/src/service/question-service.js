import baseApi from './base-service'

export async function getQuestion(questionId) {

  try {
    const res = await baseApi.get(`/question/${questionId}`);
    console.log(res)
    return res.data;
  } catch (error) {
    console.log(error);
  }

}