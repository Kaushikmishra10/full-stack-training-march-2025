export const Avatar = () => {
  return (
    <img style={{width: '120px', borderRadius: '4px'}}
      src="./../public/avatar.png"
      alt="Profile"
      className="avatar"
    />
  );
};

export const Profile = () => {
  return (
    <div className="profile-container">
        <h1>Static Profile</h1>
      <table className="profile-table" border={1} >
        <tbody>
          <tr>
            <td rowSpan="3" className="avatar-cell">
              <Avatar />
            </td>
            <th>Name</th>
            <td>Kaushik Mishra</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>kaushikmishra@gmail.com</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>+91 8400491135</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
