import React, { Component } from "react";
// import "../../assets/stylesheets/";
import { connect } from "react-redux";

class ScoreBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			correctedQuestions: null,
			totalQuestions: null,
		};
	}
	componentDidUpdate(prevProps) {
		if (prevProps !== this.props) {
			var correctedQuestions = this.props.questions.filter(
				(question) => question.isCorrect
			);
			var result = correctedQuestions.length;
			this.setState({
				correctedQuestions: result,
				totalQuestions: this.props.questions.length,
			});
		}
	}
	render() {
		return (
			<>
				{this.state.totalQuestions ? (
					<div className="card_container">
						<div className="contact-card">
							<div className="contact-card__header-image">
								<div className="contact-card__avatar"></div>
							</div>
							<p className="contact-card__name">
								<h4>
									<span role="img" aria-label="name">
										📛 {this.props.player}
									</span>
								</h4>
							</p>
							<ul className="contact-card__footer">
								<li className="contact-card__footer__link contact-card__footer__link--codepen font-weight-bold">
									Score: {this.state.correctedQuestions} /{" "}
									{this.state.totalQuestions}
								</li>
							</ul>
						</div>
					</div>
				) : (
					<div>Loading...</div>
				)}
			</>
		);
	}
}
function mapStateToProps(state) {
	if (state.quiz.result.attempt) {
		var questions = state.quiz.result.attempt.questions;
		return { questions, player: state.currentUser.userInfo.name };
	}
}
export default connect(mapStateToProps)(ScoreBoard);
