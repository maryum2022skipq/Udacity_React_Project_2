import { showLoading, hideLoading } from "react-redux-loading-bar";
import { _saveQuestionAnswer, _saveQuestion } from "../utils/_DATA";
import { saveAnswerToUser, saveQuestionToUser } from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const SAVE_QUESTION_ANSWER = "SAVE_QUESTION_ANSWER";
export const SAVE_QUESTION = "SAVE_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}
export function saveQuestionAnswer(authedUser, question_id, answer) {
  return {
    type: SAVE_QUESTION_ANSWER,
    authedUser,
    question_id,
    answer,
  };
}

export function saveQuestion(authedUser, question) {
  return {
    type: SAVE_QUESTION,
    authedUser,
    question,
  };
}

export function handleSaveQuestionAnswer(authedUser, question_id, answer) {
  return (dispatch) => {
    dispatch(showLoading());
    return _saveQuestionAnswer({
      authedUser: authedUser,
      qid: question_id,
      answer: answer,
    }).then(() => {
      dispatch(saveQuestionAnswer(authedUser, question_id, answer));
      dispatch(saveAnswerToUser(authedUser, question_id, answer));
      dispatch(hideLoading());
    });
  };
}

export function handleSaveQuestion(authedUser, optionOne, optionTwo) {
  return (dispatch) => {
    dispatch(showLoading());
    const question = {
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser,
    };
    return _saveQuestion(question).then((res) => {
      dispatch(saveQuestion(authedUser, res));
      dispatch(saveQuestionToUser(authedUser, res.id));
      dispatch(hideLoading());
    });
  };
}
