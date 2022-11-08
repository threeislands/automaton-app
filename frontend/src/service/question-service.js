import baseApi from './base-service'

export async function getQuestion(questionId) {

  try {
    // const res = await baseApi.get(`/question/${questionId}`);
    // 問題のリストから取得
    const res = await questions.find(q => q.id === Number(questionId));
    return res;
  } catch (error) {
  }

}

const questions = [
  {
    "allowInputs": [
      "0",
      "1"
    ],
    "id": 1,
    "questionText": "0で終わる文字列",
    "sequences": [
      {
        "accept": true,
        "id": 255,
        "masked": false,
        "value": "0110",
      },
      {
        "accept": true,
        "id": 256,
        "masked": false,
        "value": "0"
      },
      {
        "accept": true,
        "id": 257,
        "masked": false,
        "value": "100"
      },
      {
        "accept": false,
        "id": 258,
        "masked": false,
        "value": ""
      },
      {
        "accept": false,
        "id": 259,
        "masked": false,
        "value": "001"
      },
      {
        "accept": false,
        "id": 260,
        "masked": false,
        "value": "1101"
      }
    ],
    "title": "レベル１"
  },
  {
    "allowInputs": [
      "0",
      "1"
    ],
    "id": 2,
    "questionText": "1から始まる文字列",
    "sequences": [
      {
        "accept": true,
        "id": 261,
        "masked": false,
        "value": "1"
      },
      {
        "accept": true,
        "id": 262,
        "masked": false,
        "value": "1001"
      },
      {
        "accept": true,
        "id": 263,
        "masked": false,
        "value": "110"
      },
      {
        "accept": false,
        "id": 264,
        "masked": false,
        "value": ""
      },
      {
        "accept": false,
        "id": 265,
        "masked": false,
        "value": "0101"
      }
    ],
    "title": "レベル２"
  },
  {
    "allowInputs": [
      "0",
      "1",
      "2"
    ],
    "id": 3,
    "questionText": "1を含む文字列",
    "sequences": [
      {
        "accept": true,
        "id": 266,
        "masked": false,
        "value": "0210"
      },
      {
        "accept": true,
        "id": 267,
        "masked": false,
        "value": "1"
      },
      {
        "accept": true,
        "id": 268,
        "masked": true,
        "value": "102"
      },
      {
        "accept": false,
        "id": 269,
        "masked": false,
        "value": ""
      },
      {
        "accept": false,
        "id": 270,
        "masked": true,
        "value": "0220"
      },
      {
        "accept": false,
        "id": 271,
        "masked": true,
        "value": "200"
      }
    ],
    "title": "レベル３"
  },
  {
    "allowInputs": [
      "0",
      "1"
    ],
    "id": 4,
    "questionText": "文字列の長さが偶数である文字列(空文字の長さは0)",
    "sequences": [
      {
        "accept": true,
        "id": 272,
        "masked": false,
        "value": "10"
      },
      {
        "accept": true,
        "id": 273,
        "masked": false,
        "value": "0110"
      },
      {
        "accept": true,
        "id": 274,
        "masked": true,
        "value": ""
      },
      {
        "accept": true,
        "id": 275,
        "masked": true,
        "value": "1011"
      },
      {
        "accept": false,
        "id": 276,
        "masked": false,
        "value": "0"
      },
      {
        "accept": false,
        "id": 277,
        "masked": true,
        "value": "101"
      },
      {
        "accept": false,
        "id": 278,
        "masked": true,
        "value": "01001"
      }
    ],
    "title": "レベル４"
  },
  {
    "allowInputs": [
      "0",
      "1"
    ],
    "id": 5,
    "questionText": "先頭の文字と末尾の文字が同じである文字列",
    "sequences": [
      {
        "accept": true,
        "id": 279,
        "masked": false,
        "value": "0"
      },
      {
        "accept": true,
        "id": 280,
        "masked": false,
        "value": "1"
      },
      {
        "accept": true,
        "id": 281,
        "masked": true,
        "value": "10011"
      },
      {
        "accept": true,
        "id": 282,
        "masked": true,
        "value": "01000"
      },
      {
        "accept": false,
        "id": 283,
        "masked": false,
        "value": ""
      },
      {
        "accept": false,
        "id": 284,
        "masked": true,
        "value": "1000"
      },
      {
        "accept": false,
        "id": 285,
        "masked": true,
        "value": "01011"
      }
    ],
    "title": "レベル５"
  },
  {
    "allowInputs": [
      "0",
      "1"
    ],
    "id": 6,
    "questionText": "101を含む文字列",
    "sequences": [
      {
        "accept": true,
        "id": 286,
        "masked": false,
        "value": "1010"
      },
      {
        "accept": true,
        "id": 287,
        "masked": true,
        "value": "011011"
      },
      {
        "accept": false,
        "id": 288,
        "masked": false,
        "value": "010011"
      },
      {
        "accept": false,
        "id": 289,
        "masked": true,
        "value": ""
      },
      {
        "accept": false,
        "id": 290,
        "masked": true,
        "value": "10001"
      }
    ],
    "title": "レベル６"
  },
  {
    "allowInputs": [
      "0",
      "1",
      "2"
    ],
    "id": 7,
    "questionText": "同じ文字が連続して並ばない文字列(空文字を含む)",
    "sequences": [
      {
        "accept": true,
        "id": 291,
        "masked": true,
        "value": "01210"
      },
      {
        "accept": true,
        "id": 292,
        "masked": true,
        "value": ""
      },
      {
        "accept": true,
        "id": 293,
        "masked": true,
        "value": "210201"
      },
      {
        "accept": false,
        "id": 294,
        "masked": true,
        "value": "1102"
      },
      {
        "accept": false,
        "id": 295,
        "masked": true,
        "value": "12022"
      },
      {
        "accept": false,
        "id": 296,
        "masked": true,
        "value": "0100"
      }
    ],
    "title": "レベル７"
  },
  {
    "allowInputs": [
      "0",
      "1",
      "2"
    ],
    "id": 8,
    "questionText": "数字の和が3の倍数(0は3の倍数)となる文字列(空文字の和は0)",
    "sequences": [
      {
        "accept": true,
        "id": 297,
        "masked": true,
        "value": "0"
      },
      {
        "accept": true,
        "id": 298,
        "masked": true,
        "value": ""
      },
      {
        "accept": true,
        "id": 299,
        "masked": true,
        "value": "00120"
      },
      {
        "accept": true,
        "id": 300,
        "masked": true,
        "value": "1202112"
      },
      {
        "accept": true,
        "id": 301,
        "masked": true,
        "value": "22210110"
      },
      {
        "accept": false,
        "id": 302,
        "masked": true,
        "value": "1"
      },
      {
        "accept": false,
        "id": 303,
        "masked": true,
        "value": "1010102"
      },
      {
        "accept": false,
        "id": 304,
        "masked": true,
        "value": "1110121"
      },
      {
        "accept": false,
        "id": 305,
        "masked": true,
        "value": "012221"
      }
    ],
    "title": "レベル８"
  }
]
