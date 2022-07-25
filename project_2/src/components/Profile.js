const Profile = ({ user }) => {
  return (
    <img
      src={user ? user.avatarURL : "undefined"}
      alt="Avatar"
      className="avatar"
    />
  );
};
export default Profile;
