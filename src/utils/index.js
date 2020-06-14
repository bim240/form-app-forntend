function isValidQuestion(question) {
	var status = true;
	if (
		question.title &&
		question.answers &&
		question.options &&
		question.answers.length &&
		question.options.length === 4
	) {
		question.answers.forEach((answer) => {
			if (!question.options.includes(answer)) {
				status = false;
			}
		});
	} else {
		status = false;
	}

	return status;
}

function validateAndReturnUser(user) {
	var validatedData = {};
	//temporary change
	if (user.email && user.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
		validatedData.email = user.email;
	} else if (user.email) {
		return false;
	}
	if (user.password && user.password.length > 5) {
		validatedData.password = user.password;
	} else if (user.password) {
		return false;
	}
	if (user.name) {
		validatedData.name = user.name;
	}
	//temporary change
	return validatedData;
}

export { isValidQuestion, validateAndReturnUser };
