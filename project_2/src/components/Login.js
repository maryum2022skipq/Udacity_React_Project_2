import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser(e.target.value);
  };

  const handleSubmit = () => {
    props.dispatch(setAuthedUser(user));
    if (window.location.pathname === "/") {
      navigate("/");
    }
  };

  return (
    <div>
      <h1>Employee Polls</h1>
      <img
        src="https://png.pngtree.com/png-vector/20191003/ourmid/pngtree-user-login-or-authenticate-icon-on-gray-background-flat-icon-ve-png-image_1786166.jpg"
        alt="loginPage"
      />
      <h2>Login</h2>
      <div>
        <h4>User</h4>
        <select
          onChange={handleChange}
          data-testid="login_select"
          defaultValue={"none"}
        >
          <option value="none" disabled>
            Select User
          </option>
          {props.users
            ? props.users.map((user) => {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })
            : ""}
        </select>
      </div>
      <input
        type="submit"
        value="LOGIN"
        data-testid="login_submit"
        className="btn"
        onClick={handleSubmit}
        disabled={user === ""}
      />
    </div>
  );
}

const mapStateToProps = ({ users }) => {
  return {
    users: Object.keys(users),
  };
};

export default connect(mapStateToProps)(Login);
