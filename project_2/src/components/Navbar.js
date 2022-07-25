import { connect } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";
import Profile from "./Profile";

const Navbar = (props) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    props.dispatch(setAuthedUser(null));
    navigate("/");
  };
  return (
    <div>
      <nav className="nav">
        <ul>
          <li>
            <Profile user={props.user} />
          </li>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard">Leaderboard</NavLink>
          </li>
          <li>
            <NavLink to="/add">New</NavLink>
          </li>

          <li
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "green",
            }}
          >
            Welcome {props.user ? props.user.name : "undefined"}!
          </li>
          <li className="logout" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </nav>
    </div>
  );
};

const mapStateToProps = ({ users, authedUser }) => {
  const user = users[authedUser];
  return {
    user,
    authedUser,
  };
};

export default connect(mapStateToProps)(Navbar);
