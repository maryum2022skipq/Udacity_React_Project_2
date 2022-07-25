import { connect } from "react-redux";
import { Link } from "react-router-dom";

const PollView = (props) => {
  return (
    <Link to={`/questions/${props.id}`}>
      <div className="poll_view_card">
        <img
          src={props.avatar}
          alt={`Avatar of ${props.author}`}
          className="avatar"
        />
        <div className="card_container">
          <strong>{props.author}</strong>
          <br />
          {new Date(props.timestamp).toLocaleTimeString()} |{" "}
          {new Date(props.timestamp).toLocaleDateString()}
        </div>
      </div>
    </Link>
  );
};

const mapStateToProps = ({ users, questions }, { id }) => {
  const question = questions[id];
  const author = question.author;
  const timestamp = questions[id].timestamp;
  const avatar = users[author].avatarURL;

  return {
    questions,
    author,
    timestamp,
    avatar,
  };
};

export default connect(mapStateToProps)(PollView);
