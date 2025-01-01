import Logo from "../assets/logo2.png";

const Home = () => {
  return (
    <div className="mother-background">
      <div className="major-container">
        <div className="content-container">
          <div className="logo-head">
            <img className="logo" src={Logo} alt="UW Logo" />
          </div>
          <div className="main">
            <h1 className="title">University Security Check</h1>
            <p className="text">
              {" "}
              To ensure the safety of your personal information, all users must
              verify their credentials before accessing University of Washington
              services. Please click the button below to proceed securely.
            </p>
            <a href="/login" className="proceed">
              Proceed to Secure Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
