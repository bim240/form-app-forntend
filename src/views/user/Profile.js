import React from "react";
import { connect } from "react-redux";
import updateUser from "../../state/actions/userActions";
import { validateAndReturnUser } from "../../utils";
import { Link } from "react-router-dom";

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			wantToMakeTheInput: false,
			name: this.props.currentUser.name || "",
			email: this.props.currentUser.email || "",
			password: "",
			errorMsg: null,
		};
	}

	makeInputForm = () => {
		this.setState({ wantToMakeTheInput: true });
	};

	handleInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let user = {
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
			};

			//find the changed value
			//check if it is valid or not
			//if valid, dispatch updateUser(validated)

			console.log(user, "Inside HandleSubmit user"); //same

			var validatedData = validateAndReturnUser(user);

			console.log(validatedData, "Validated Data");

			if (!validatedData) {
				return this.setState({
					errorMsg: "Please Provide Valid Credentials",
				});
			}

			let res = await this.props.dispatch(updateUser(validatedData));

			if (!res) {
				this.setState({
					errorMsg: "Something went wrong.",
				});
			}

			// alert("User Updated Successfully");
			this.setState({ wantToMakeTheInput: false, password: "" });
			// this.props.history.push("/");
		} catch (error) {
			console.log("inside catch", error);
		}
	};

	render() {
		this.props.quiz && console.log(this.props.quiz, "Inside Render");

		return (
			<>
				{console.log(this.props)}
				<h2>Profile</h2>
				<div className="profile-and-quizzes-container">
					<div className="quizzes-container">
						<h1>Quizzes</h1>
					</div>
					<div className="profile-to-be-form-container">
						{this.state.errorMsg ? <p>{this.state.errorMsg}</p> : null}

						{this.state.wantToMakeTheInput ? (
							<form onSubmit={(e) => this.handleSubmit(e)}>
								<div class="input-group mb-3">
									<div class="input-group-prepend">
										<span class="input-group-text" id="basic-addon1">
											Name
										</span>
									</div>
									<input
										type="text"
										class="form-control"
										aria-label="Username"
										aria-describedby="basic-addon1"
										name="name"
										onChange={(e) => this.handleInput(e)}
										value={this.state.name}
									/>
								</div>
								<div class="input-group mb-3">
									<div class="input-group-prepend">
										<span class="input-group-text" id="basic-addon1">
											Email
										</span>
									</div>
									<input
										type="email"
										class="form-control"
										aria-label="Username"
										aria-describedby="basic-addon1"
										name="email"
										onChange={(e) => this.handleInput(e)}
										value={this.state.email}
									/>
								</div>
								<div class="input-group mb-3">
									<div class="input-group-prepend">
										<span class="input-group-text" id="basic-addon1">
											Password
										</span>
									</div>
									<input
										type="password"
										class="form-control"
										aria-label="Username"
										aria-describedby="basic-addon1"
										name="password"
										onChange={(e) => this.handleInput(e)}
										value={this.state.password}
									/>
								</div>

								<div className="center">
									<button class="btn btn-success">Update</button>
								</div>
							</form>
						) : (
							<>
								<p>{this.props.currentUser.name}</p>
								<span
									onClick={this.makeInputForm}
									className="edit-profile-button"
								>
									🖉
								</span>
							</>
						)}
					</div>
				</div>

				{/* {Temporaary changes} */}

				{this.props.quiz &&
					this.props.quiz.map((quiz, i) => {
						return (
							<div className="col-6 col-md-4 mb-6" key={i}>
								<div className="card" style={{ width: "18rem" }}>
									<img
										className="card-img-top"
										style={{
											height: "160px",
											objectFit: "cover",
											filter: " opacity(.7)",
										}}
										src="https://thumbs.dreamstime.com/z/quiz-test-survey-exam-vector-concept-online-laptop-education-illustration-80657742.jpg"
										alt="Card image cap"
									/>

									<div className="card-body">
										<h5 className="card-title">{quiz.title}</h5>
										<Link to={`/quiz/${quiz._id}`} className="btn btn-primary">
											Play
										</Link>
										{this.props.currentUser.id === quiz.authorId ? (
											<>
												<Link
													to={`/quiz/${quiz._id}/edit`}
													className="btn btn-warning mx-1"
												>
													Edit
												</Link>
												<button
													onClick={() => this.handleDeleteQuiz(quiz._id)}
													className="btn btn-danger mx-1"
												>
													Delete
												</button>
											</>
										) : null}
									</div>
								</div>
							</div>
						);
					})}
			</>
		);
	}
}

function mapStateToProps(state) {
	console.log(state.quiz.quizList.quizzes, "inside mapStateToProps");
	return {
		currentUser: state.currentUser.userInfo,
		quiz: quizByCurrentUser(
			state.quiz.quizList.quizzes,
			state.currentUser.userInfo
		),
	};
}

function quizByCurrentUser(quizlist, currentUser) {
	let filteredQuiz;
	if (quizlist) {
		filteredQuiz = quizlist.filter((oneQuiz) => {
			console.log(oneQuiz.authorId, currentUser.id, "inside oneQuiz");
			return true;
		});
	}
	console.log(filteredQuiz, "filteredQuiz");

	return filteredQuiz;
}

export default connect(mapStateToProps)(Profile);
