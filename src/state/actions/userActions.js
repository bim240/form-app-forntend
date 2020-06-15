import axios from "axios";
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
			let updatedUser = await axios.put(`${url}/users`, { user: data });

			dispatch({
				type: "FETCH_CURRENT_USER_SUCCESS",
				payload: updatedUser.data.user,
			});

			return updatedUser;
		} catch (error) {
			return error;
		}
	};
};

export default updateUser;
