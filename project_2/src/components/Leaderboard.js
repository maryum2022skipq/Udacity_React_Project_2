import Navbar from "./Navbar";
import { connect } from "react-redux";

const Leaderboard = (props) => {
  return (
    <div>
      <Navbar />
      <div className="leaderboard_table_container">
        <table>
          <thead>
            <th>Users</th>
            <th>Answered</th>
            <th>Created</th>
          </thead>
          <tbody>
            {props.countList.map((user) => {
              return (
                <tr key={user.id}>
                  <td>
                    <img src={user.avatarURL} alt="Avatar" className="avatar" />
                    <br />
                    {user.name} <br />
                    {user.id}
                  </td>
                  <td>{user.answered}</td>
                  <td>{user.created}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
const mapStateToProps = ({ users }) => {
  const userList = Object.keys(users).sort(function (a, b) {
    return (
      Object.keys(users[b].answers).length +
      users[b].questions.length -
      (Object.keys(users[a].answers).length + users[a].questions.length)
    );
  });
  const countList = userList.map((user) => {
    return {
      id: users[user].id,
      name: users[user].name,
      avatarURL: users[user].avatarURL,
      created: Object.keys(users[user].questions).length,
      answered: Object.keys(users[user].answers).length,
    };
  });
  return {
    countList,
  };
};
export default connect(mapStateToProps)(Leaderboard);
