import React from "react";
import "./assets/stylesheets/main.scss";
import "bulma/css/bulma.css";

import HomePage from "./views/auth/HomePage";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import CreateQuiz from "./views/quiz/createQuiz";
import ScoreBoard from "./views/quiz/ScoreBoard";
import Header from "./views/common/Header";
import AttemptQuiz from "./views/quiz/attemptQuiz";
import Login from "./views/auth/login";
import Signup from "./views/auth/signup";
import EditQuiz from "./views/quiz/editQuiz";
import Profile from "./views/user/Profile";
import { quizList } from "./state/actions/quizActions";

import { identifyUser } from "./state/actions/authActions";

function ProtectedRoutes() {
	return (
		<Switch>
			<Route exact path="/" component={HomePage} />
			<Route path="/quiz/new" component={CreateQuiz} />
			<Route exact path="/score" component={ScoreBoard} />
			<Route exact path="/quiz/:id" component={AttemptQuiz} />
			<Route exact path="/quiz/:id/edit" component={EditQuiz} />
			<Route exact path="/profile" component={Profile} />
			<Route path="*" render={() => <h1>User already logged in</h1>} />
		</Switch>
	);
}

function PublicRoutes() {
	return (
		<Switch>
			<Route exact path="/" component={HomePage} />
			<Route exact path="/score" component={ScoreBoard} />
			<Route path="/login" component={Login} />
			<Route path="/signup" component={Signup} />
		</Switch>
	);
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		if (localStorage["auth-token"]) {
			this.props.dispatch(identifyUser());
		}
		this.props.dispatch(quizList());
	}

	render() {
		const currentUser = this.props.currentUser;
		return (
			<>
				{currentUser.isAuthReqInProgress ? (
					<div>Loading . . .</div>
				) : (
					<>
						<Header />
						{currentUser.userInfo ? <ProtectedRoutes /> : <PublicRoutes />}
					</>
				)}
			</>
		);
	}
}

function mapStateToProps(state) {
	return { currentUser: state.currentUser };
}
export default connect(mapStateToProps)(App);
