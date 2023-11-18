const WelcomeMsg = ({ name, userType }) => {
  return (
    <>
      <h3 className="text-primary text-center">Welcome, {name}</h3>
      <p className="text-muted text-center">
        Take a quick look at your {userType} stats below
      </p>
    </>
  );
};

export default WelcomeMsg;
