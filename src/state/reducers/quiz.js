import { quizList } from "../actions/quizActions";

var intialState = {
  quizList: [],
  quiz: "",
};

function Quiz(state = intialState, action) {
  switch (action.type) {
    case "FETCH_QUIZ_LIST":
      return { ...state, quizList: action.payload };
    case "FETCH_QUIZ":
      return { ...state, quiz: action.payload };
    case "DELETE_QUIZ":
      console.log(state.quizList);
      return {
        ...state,
        quizList: {
          ...state.quizList,
          quizzes: state.quizList.quizzes.filter(
            (quiz) => quiz._id != action.payload
          ),
        },
      };
    case "ADD_NEW_QUIZ_QUESTION":
      return {
        ...state,
        quizList: {
          ...state.quizList,
          quizzes: state.quizList.quizzes.map((quiz) => {
            if (quiz._id == action.payload._id) {
              return quiz.quesions.push(action.payload);
            }
            return quiz;
          }),
        },
      };
    default:
      return state;
  }
}

export default Quiz;
