import axios from "axios";
const url = "/api/v1";

const setTokenToAxios = (token) => {
	axios.defaults.headers.common["authorization"] =
		token || localStorage["auth-token"] || "";
};

setTokenToAxios();

const createQuiz = (data) => {
	return async (dispatch) => {
		try {
			// dispatch({ type: "FETCH_CURRENT_USER_START" });

			let quiz = await axios.post(`${url}/quiz`, data);

			// dispatch({
			//   // type: "FETCH_CURRENT_USER_SUCCESS",
			//   payload: user.data.user,
			// });
		} catch (error) {}
	};
};

const quizList = () => {
	return async (dispatch) => {
		try {
			let quizzes = await axios.get(`${url}/quiz`);
			dispatch({
				type: "FETCH_QUIZ_LIST",
				payload: quizzes.data,
			});
		} catch (error) {}
	};
};

const showQuiz = (id) => {
	// console.log("in action");
	return async (dispatch) => {
		try {
			let quiz = await axios.get(`${url}/quiz/${id}`);
			dispatch({
				type: "FETCH_QUIZ",
				payload: quiz.data.quiz,
			});
		} catch (error) {}
	};
};

const updateQuestion = (id, data) => {
	return async (dispatch) => {
		try {
			// dispatch({ type: "FETCH_CURRENT_USER_START" });

			let quiz = await axios.put(`${url}/questions/${id}`, data);

			// dispatch({
			//   // type: "FETCH_CURRENT_USER_SUCCESS",
			//   payload: user.data.user,
			// });
		} catch (error) {}
	};
};
const addNewQuestion = (data) => {
	return async (dispatch) => {
		try {
			// dispatch({ type: "FETCH_CURRENT_USER_START" });

			let quiz = await axios.post(`${url}/questions`, data);

			// console.log(quiz.data.question);
			dispatch({
				type: "ADD_NEW_QUIZ_QUESTION",
				payload: quiz.data.question,
			});
		} catch (error) {}
	};
};

const deleteQuestion = (id) => {
	return async (dispatch) => {
		try {
			await axios.delete(`${url}/questions/${id}`);
			dispatch({
				type: "DELETE_QUESTION",
				payload: id,
			});
		} catch (error) {}
	};
};

const deleteQuiz = (id) => {
	// console.log("in action");
	return async (dispatch) => {
		try {
			await axios.delete(`${url}/quiz/${id}`);
			dispatch({
				type: "DELETE_QUIZ",
				payload: id,
			});
		} catch (error) {}
	};
};

const changeQuizTitle = (title) => {
	return {
		type: "CHANGE_QUIZ_TITLE",
		payload: title,
	};
};

const updateQuizTitle = (id, title) => {
	return async (dispatch) => {
		try {
			let updatedQuiz = await axios.put(`${url}/quiz/${id}`, {
				quiz: { title },
			});
			let quizTitle = updatedQuiz.data.updatedQuizTitle.title;
			dispatch({
				type: "UPDATE_QUIZ_TITLE",
				payload: quizTitle,
			});
		} catch (error) {}
	};
};
const attemptQuiz = (attempt) => {
	return async (dispatch) => {
		try {
			var quizResult = await axios.post(
				`${url}/quiz/${attempt.quizId}/attempt`,
				attempt
			);
			console.log(quizResult);
			dispatch({
				type: "ATTEMPT_QUIZ",
				payload: quizResult.data,
			});
		} catch (error) {}
	};
};

export {
	createQuiz,
	quizList,
	showQuiz,
	deleteQuiz,
	updateQuestion,
	addNewQuestion,
	deleteQuestion,
	changeQuizTitle,
	updateQuizTitle,
	attemptQuiz,
};
