import {
  RECEIVE_QUESTIONS,
  SAVE_QUESTION_ANSWER,
  SAVE_QUESTION,
} from "../actions/questions";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case SAVE_QUESTION_ANSWER:
      return {
        ...state,
        [action.question_id]: {
          ...state[action.question_id],
          [action.answer]: {
            ...state[action.question_id][action.answer],
            votes: state[action.question_id][action.answer].votes.concat(
              action.authedUser
            ),
          },
        },
      };
    case SAVE_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };
    default:
      return state;
  }
}
