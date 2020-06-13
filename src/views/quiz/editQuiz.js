import React, { Component } from "react";
import { connect } from "react-redux";
import { showQuiz } from "../../state/actions/quizActions";
import QuestionForm from "./QuestionForm";
import { deleteQuestion , changeQuizTitle ,updateQuizTitle } from "../../state/actions/quizActions";

class EditQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // title : this.props.quiz || "" ,
      editQuestionIndex: -1,
      newQuestion: false,
      question: {
        title: "",
        options: [],
        answers: [],
      },
      editTitleStatus : false
    };
  }

  componentDidMount() {
    let quizId = this.props.match.params.id;
    this.props.dispatch(showQuiz(quizId));
  
  }

  openEditForm = (question, index) => {
    this.setState({
      editQuestionIndex: index,
    });
  };

  // syncQuestion = () => {};

  // deleteQuestion = () => {};

  reportOnUpdate = (index) => {
    this.setState({ editQuestionIndex: -1, updatedQuestionIndex: index });
  };

  reportOnAddingNewQuestion = () => {
    this.setState({ newQuestion: !this.state.newQuestion });
  };


  handelChangeQuizTitle = (e) =>{
    this.props.dispatch(changeQuizTitle(e.target.value));
    if(this.state.editTitleStatus){
      this.setState({editTitleStatus : false});
    }
  }

  handelQuizTitleUpdate = (id) =>{
     this.props.dispatch(updateQuizTitle(id , this.props.quiz.title));
     this.setState({ editTitleStatus : true });
  }

  handelDeleteQuiz = (question) =>{
    this.props.dispatch(deleteQuestion(question._id));
  }

  render() {
    const quiz = this.props.quiz;
    return (
      <>
        {quiz ? (
          <>
            <div className="container mt-4">
              <div>
                {this.state.editTitleStatus ? <p> Title updated Successfully </p> : null }
                <input type="text" name="title" onChange = {this.handelChangeQuizTitle} value={quiz.title } />
                <button onClick = {()=>this.handelQuizTitleUpdate(quiz._id)} >Save</button>
              </div>

              <div className="jumbotron mt-6 ml-6 mr-6">
                <div className="row">
                  {this.state.newQuestion ? (
                    <QuestionForm
                      question={this.state.question}
                      syncQuestion={false}
                      isInvalidQuestion={false}
                      deleteQuestion={() => {}}
                      hideDeleteButton={true}
                      isBeingUpdated={false}
                      addingNewQuestion={true}
                      reportOnAddingNewQuestion={this.reportOnAddingNewQuestion}
                      quizId={this.props.match.params.id}
                    />
                  ) : (
                    <div className="col mx-auto">
                      {quiz.questions.map((question, i) => {
                        return (
                          <div className="col-md-6" key={i}>
                            {this.state.editQuestionIndex === i ? (
                              <QuestionForm
                                key={i}
                                questionIndex={i}
                                question={question}
                                syncQuestion={false}
                                isInvalidQuestion={false}
                                deleteQuestion={() => {}}
                                hideDeleteButton={true}
                                isBeingUpdated={true}
                                reportOnUpdate={this.reportOnUpdate}
                              />
                            ) : (
                              <>
                                {this.state.updatedQuestionIndex == i ? (
                                  <p className="success">Saved Successfully.</p>
                                ) : null}
                                <h4> Q: {question.title}</h4>
                                <div className="row">
                                  <button
                                    className="btn btn-warning mx-3"
                                    onClick={() =>
                                      this.openEditForm(question, i)
                                    }>
                                    Edit
                                  </button>
                                  <button  onClick={() =>{
                                    this.handelDeleteQuiz(question)
                                  }}  className="btn btn-danger mx-3">
                                    Delete
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })}
                      {this.state.editQuestionIndex ? (
                        <button
                          className="btn btn-warning m-3"
                          onClick={this.reportOnAddingNewQuestion}>
                          {" "}
                          Add New Question
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return { quiz: state.quiz.quiz };
}

export default connect(mapStateToProps)(EditQuiz);
