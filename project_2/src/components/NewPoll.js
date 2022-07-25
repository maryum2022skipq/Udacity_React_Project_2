import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { handleSaveQuestion } from "../actions/questions";
import { useNavigate } from "react-router-dom";

const NewPoll = (props) => {
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [isDisabled, setDisabled] = useState(true);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    props.dispatch(handleSaveQuestion(props.authedUser, optionOne, optionTwo));
    navigate("/");
  };
  useEffect(() => {
    const check_inputFields = () => {
      if (optionOne.length > 0 && optionTwo.length > 0) {
        setDisabled(false);
      }
    };
    check_inputFields();
  }, [optionOne, optionTwo]);

  return (
    <div>
      <Navbar />
      <div>
        <h2>Would You Rather</h2>
        <h5 style={{ color: "grey" }}>Create Your Own Poll</h5>
      </div>
      <form>
        <div>
          <label>First Option</label>
          <div>
            <input
              className="new_poll_input"
              type="text"
              data-testid="optionOne"
              placeholder="Option 1"
              onChange={(e) => {
                setOptionOne(e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <label>Second Option</label>
          <div>
            <input
              className="new_poll_input"
              type="text"
              data-testid="optionTwo"
              placeholder="Option 2"
              onChange={(e) => {
                setOptionTwo(e.target.value);
              }}
            />
          </div>
        </div>
        <input
          type="submit"
          value="Submit"
          data-testid="submit_poll"
          disabled={isDisabled}
          className="btn"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});
export default connect(mapStateToProps)(NewPoll);
