import React from "react";
import { connect } from "react-redux";
import updateUser from "../../state/actions/userActions";
import { validateAndReturnUser } from "../../utils";

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
			errorMsg: null,
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

			var validatedData = validateAndReturnUser(user);
			if (!validatedData) {
				return this.setState({
					errorMsg: "Please Provide Valid Username, email and Password",
				});
			}

			let res = await this.props.dispatch(updateUser(validatedData));

			console.log(res);

			if (!res) {
				return this.setState({
					errorMsg: <p>{"Something went wrong."}</p>,
				});
			}

			alert("User Updated Successfully");
			this.setState({ wantToMakeTheInput: false, password: "" });
			// this.props.history.push("/");
		} catch (error) {
			console.log("inside catch", error);
		}
	};

	render() {
		return (
			<>
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
			</>
		);
	}
}

function mapStateToProps(state) {
	return { currentUser: state.currentUser.userInfo };
}
export default connect(mapStateToProps)(Profile);
