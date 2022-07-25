import Navbar from "./Navbar";
import { connect } from "react-redux";
import { useState } from "react";
import PollView from "./PollView";

const Home = (props) => {
  //user should be able to toggle between his/her answered and unanswered polls
  // polls in both categories are arranged from the most recently created (top)
  //The unanswered polls should be shown by default
  //name of the logged in user should be visible on the page
  const [answerToggle, setAnswerToggle] = useState(false);
  //const [answered, setAnswered] = useState(null);
  //const [unAnswered, setUnAnswered] = useState(null);
  const answered = props.user
    ? Object.keys(props.user.answers).sort(
        (a, b) => props.questions[b].timestamp - props.questions[a].timestamp
      )
    : null;
  const unAnswered = answered
    ? Object.values(props.questions)
        .filter((question) => !answered.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp)
    : Object.keys(props.questions).sort((a, b) => b.timestamp - a.timestamp);

  const handleToggleQuestions = () => {
    setAnswerToggle(!answerToggle);
  };

  return (
    <div>
      <Navbar />
      <button className="btn" type="button" onClick={handleToggleQuestions}>
        Show {answerToggle ? "Unanswered" : "Answered"} Questions
      </button>
      {!answerToggle ? (
        <div>
          <h3>New Questions</h3>
          <div className="pollviews_main_container">
            {unAnswered.map((poll) => {
              return <PollView key={poll.id} id={poll.id} />;
            })}
          </div>
        </div>
      ) : (
        <div>
          <h3>{answered ? "Done!" : "You haven't answered any polls yet."}</h3>
          <div className="pollviews_main_container">
            {answered.map((poll) => {
              return <PollView key={poll} id={poll} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }) => {
  //get user details
  const user = users[authedUser];
  //get qs that user ans and sort them by their timestamp
  //const answered = user
  //  ? Object.keys(user.answers).sort(
  //      (a, b) => questions[b].timestamp - questions[a].timestamp
  //    )
  //  : null;
  //if answered qs is null, user hasnt answered any qs so show all qs else filter
  //const unAnswered = answered
  //  ? Object.values(questions)
  //      .filter((question) => !answered.includes(question.id))
  //      .sort((a, b) => b.timestamp - a.timestamp)
  //  : Object.keys(questions).sort((a, b) => b.timestamp - a.timestamp);
  return {
    user,
    //answered,
    //unAnswered,
    questions,
  };
};
export default connect(mapStateToProps)(Home);
