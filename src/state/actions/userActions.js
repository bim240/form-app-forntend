import axios from "axios";
import { updateQuestion } from "./quizActions";
const url = "/api/v1";

const setTokenToAxios = (token) => {
	axios.defaults.headers.common["authorization"] =
		token || localStorage["auth-token"] || "";
};

setTokenToAxios();

const updateUser = (data) => {
	return async (dispatch) => {
		console.log("insideUpdateUser", data);

		try {
			// dispatch({ type: "FETCH_CURRENT_USER_START" });

			let updatedUser = await axios.put(`${url}/users`, { user: data });

			// dispatch({
			//   // type: "FETCH_CURRENT_USER_SUCCESS",
			//   payload: user.data.user,
			// });
			return updatedUser;
		} catch (error) {}
	};
};

export default updateUser;
