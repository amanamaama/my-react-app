function Profile(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Learning: {props.topic}</p>
    </div>
  );
}

export default Profile;