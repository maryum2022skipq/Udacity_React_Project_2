import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import Profile from "./Profile";
import { handleSaveQuestionAnswer } from "../actions/questions";
import { useNavigate } from "react-router-dom";

const PollDetail = (props) => {
  //get question id from url params
  //use flexbox for displaying options
  //if ans by auth diplay #ofvotes per option and %ofpeople votes - countvotes
  //mark auth ans and disable selection
  //application should show a 404 page if the user is trying to access a poll that does not exist -
  //need sep func for 404 cuz question id route will match so it wont reroute
  const navigate = useNavigate();
  const { question_id } = useParams();
  const question = props.questions[question_id];
  const [selected, setSelected] = useState("");

  if (question === undefined) {
    return navigate("/*");
  }

  const total_votes = [
    ...question.optionOne.votes,
    ...question.optionTwo.votes,
  ];

  const auth_answered = total_votes.includes(props.authedUser) ? true : false;

  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.dispatch(
      handleSaveQuestionAnswer(props.authedUser, question_id, selected)
    );
  };

  return (
    <div>
      <Navbar />
      <div className="center">
        <h2>Poll by {question.author}</h2>
        <Profile user={props.users[question.author]} />
        <h3>Would You Rather </h3>
        <form>
          <div className="option_container">
            <div>
              <input
                type="radio"
                id="option1"
                name="poll"
                value="optionOne"
                onClick={handleChange}
                defaultChecked={question.optionOne.votes.includes(
                  props.authedUser
                )}
                disabled={auth_answered}
              />
              <label htmlFor="option1">
                {question.optionOne.votes.includes(props.authedUser) ? (
                  <strong>{question.optionOne.text}</strong>
                ) : (
                  question.optionOne.text
                )}
              </label>
              {auth_answered && (
                <div>
                  {`${question.optionOne.votes.length}/${
                    total_votes.length
                  } (${(
                    (question.optionOne.votes.length / total_votes.length) *
                    100
                  ).toFixed(1)}%) employees selected this option. `}
                </div>
              )}
            </div>
            <div>
              <input
                type="radio"
                id="option2"
                name="poll"
                value="optionTwo"
                onClick={handleChange}
                defaultChecked={question.optionTwo.votes.includes(
                  props.authedUser
                )}
                disabled={auth_answered}
              />
              <label htmlFor="option1">
                {question.optionTwo.votes.includes(props.authedUser) ? (
                  <strong>{question.optionTwo.text}</strong>
                ) : (
                  question.optionTwo.text
                )}
              </label>
              {auth_answered && (
                <div>
                  {`${question.optionTwo.votes.length}/${
                    total_votes.length
                  } (${(
                    (question.optionTwo.votes.length / total_votes.length) *
                    100
                  ).toFixed(1)}%) employees selected this option. `}
                </div>
              )}
            </div>
          </div>
          <input
            type="submit"
            value="Submit"
            disabled={auth_answered}
            className="btn"
            onClick={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }) => {
  return {
    authedUser,
    users,
    questions,
  };
};

export default connect(mapStateToProps)(PollDetail);
