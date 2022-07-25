import { useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import LoadingBar from "react-redux-loading-bar";
import Home from "./Home";
import PageNotFound from "./PageNotFound";
import NewPoll from "./NewPoll";
import Leaderboard from "./Leaderboard";
import PollDetail from "./PollDetail";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, [props]);

  return (
    <div className="App">
      <LoadingBar />
      {props.authedUser ? (
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/add" element={<NewPoll />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/questions/:question_id" element={<PollDetail />} />
        </Routes>
      ) : (
        <Login />
      )}
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
  authedUser,
});

export default connect(mapStateToProps)(App);
