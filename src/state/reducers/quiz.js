import { quizList } from "../actions/quizActions";

var intialState = {
	quizList: [],
	quiz: "",
	result: "",
};

function Quiz(state = intialState, action) {
	switch (action.type) {
		case "FETCH_QUIZ_LIST":
			return { ...state, quizList: action.payload };
		case "FETCH_QUIZ":
			return { ...state, quiz: action.payload };
		case "DELETE_QUIZ":
			return {
				...state,
				quizList: {
					...state.quizList,
					quizzes: state.quizList.quizzes.filter(
						(quiz) => quiz._id != action.payload
					),
				},
			};
		case "DELETE_QUESTION":
			return {
				...state,
				quiz: {
					...state.quiz,
					questions: state.quiz.questions.filter(
						(question) => question._id !== action.payload
					),
				},
			};

		// just change quiz title  but not update to backend
		case "CHANGE_QUIZ_TITLE":
			return {
				...state,
				quiz: {
					...state.quiz,
					title: action.payload,
				},
			};
		case "UPDATE_QUIZ_TITLE":
			return {
				...state,
				quiz: {
					...state.quiz,
					title: action.payload,
				},
			};

		case "ADD_NEW_QUIZ_QUESTION":
			console.log(action.payload, state.quiz.questions);
			return {
				...state,
				quiz: {
					...state.quiz,
					questions: [...state.quiz.questions, action.payload],
				},
			};
		case "ATTEMPT_QUIZ":
			return {
				...state,
				result: action.payload,
			};
		default:
			return state;
	}
}

export default Quiz;
