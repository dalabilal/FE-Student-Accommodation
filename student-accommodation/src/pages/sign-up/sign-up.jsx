import Input from "../../component/common/input/input.component";
import useNotification from "../../hook/notification.hook";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../service/UserContext";
import logo from "../../assests/logo.jpg";
import StrongPassword from "./passwordStrength";
import Home from "../../assests/home.png";
import ReCAPTCHA from "react-google-recaptcha";
import "./sign-up.css";

const SignUp = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [emailExists, setEmailExists] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [cap, setCap] = useState(null);
  const [verify, setVerify] = useState(null);
  const { setNotification } = useNotification();
  const navigate = useNavigate();
  const {
    verificationCode,
    setVerificationCode,
    emailVerify,
    setEmailVerify,
    color,
  } = useUser();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setNotification({ message: "Invalid email format", status: "error" });
      setVerify(false);
      return;
    }

    if (!role) {
      setNotification({ message: "Please select a role", status: "error" });
      return;
    }

    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      setEmailExists(false);
      return;
    }

    if (color !== "Green") {
      setError("Your Password is not strong");
      return;
    }

    try {
      const response = await fetch("http://localhost:3005/sendEmail/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailVerify }),
      });
      if (response.ok) {
        setVerify(true);
      } else {
        const responseData = await response.json();
        if (responseData.error) {
          if (responseData.error.message === "Email already exists") {
            setEmailExists(true);
            setVerify(false);
            setNotification({
              message: "Email already exists",
              status: "error",
            });
          }
        }
      }
    } catch (error) {
      console.error(
        "Error sending verification code:",
        error.response ? error.response.data : error.message
      );
      setNotification({
        message: "Error sending verification code. Please try again.",
        status: "error",
      });
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3005/verify/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          verificationCode: verificationCode,
          verificationcode2: verificationCode,
        }),
      });

      if (response.ok) {
        handleSubmit(e);
      } else {
        setNotification({
          message: "Verification code are not right",
          status: "warning",
        });
      }
    } catch (error) {
      console.error("Error during verification:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3005/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
          confirmPassword,
          phoneNumber,
          role,
        }),
      });

      if (response.ok) {
        role === "owner"
          ? setNotification({
              message:
                "Your account has been created successfully. Please wait for admin approval.",
              status: "success",
            })
          : setNotification({
              message: "Your account has been created successfully.",
              status: "success",
            });
        navigate("/signin");
      } else {
        const responseData = await response.json();
        if (responseData.error) {
          if (responseData.error.message === "Email already exists") {
            setEmailExists(true);
            setVerify(false);
            setNotification({
              message: "Email already exists",
              status: "error",
            });
          } else if (responseData.error.message === "Passwords do not match") {
            setNotification({
              message: "User is not created",
              status: "error",
            });
            setVerify(false);
            setPasswordsMatch(false);
          } else {
            console.error("Failed to sign up:", responseData.error.message);
            setNotification({
              message: "User is not created",
              status: "error",
            });
            setVerify(false);
          }
        }
      }
    } catch (error) {
      setNotification({ message: "Server Error", status: "warning" });
      setVerify(false);
    }
  };

  useEffect(() => {
    setEmailExists(false);
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      setEmailExists(false);
    }
  }, [email, password, confirmPassword, color , error]);

  const handleCancelVerification = () => {
    setVerificationCode("");
    setVerify(false);
  };

  return (
    <div className="main1">
      <img
        src={Home}
        alt="homepage"
        className="img-sign"
        onClick={() => navigate("/")}
      />
      <form className="sign-up-form" onSubmit={handleVerification}>
        <div className="title">
          <span>Sign Up</span>
        </div>
        <div className="name">
          <Input
            label="first name"
            required
            radius={15}
            height={30}
            width={160}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <Input
            label="last name"
            required
            radius={15}
            height={30}
            width={160}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <Input
          label="email"
          required
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailExists(false);
            setEmailVerify(e.target.value);
          }}
        />
        {emailExists && (
          <span style={{ color: "red" }}>
            Email already exists. Please use a different email.
          </span>
        )}
        <Input
          label="phone number"
          required
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <div className="role-radio">
          <label className="role">Are you : </label>
          <label>
            <input
              type="radio"
              value="owner"
              checked={role === "owner"}
              onChange={() => setRole("owner")}
              required
            />
            <span className="radiol-label">Owner</span>
          </label>
          <label>
            <input
              type="radio"
              value="student"
              checked={role === "student"}
              onChange={() => setRole("student")}
              required
            />
            <span className="radio-label">Student</span>
          </label>
        </div>

        <StrongPassword
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          passwordsMatch={passwordsMatch}
          setPasswordsMatch={setPasswordsMatch}
          error={error}
          setError={setError}
        />
        <div id="not-match">
          {!passwordsMatch && (
            <span id="notMatch" style={{ color: "red" }}>
              Passwords do not match!
            </span>
          )}
        </div>
        <ReCAPTCHA
          id="capcha"
          sitekey="6Lekv3ApAAAAAGItI679iFinRyDDv2dDmNYU63bu"
          onChange={(val) => setCap(val)}
          style={{ float: "right", marginRight: "10px" }}
        />
        <div className="span-text1">
          <span className="condition">already have an account, </span>
          <span className="signin">
            <Link to={"/signin"}>Sign in!</Link>
          </span>
        </div>
        <div className="span-text12">
            <input className="input-terms" type="checkbox" required />
           I agree to the <Link to='/terms'>Terms</Link> and <Link to='/terms'>Privacy Policy</Link>
          </div>
        <div className="signIn-button">
          <button
            disabled={!cap}
            type="button"
            onClick={(e) => {
              handleSendEmail(e);
            }}
          >
            Sign Up
          </button>
          {verify && (
            <div className="plur-popup">
              <div className="popup-container show">
                <Input
                  id="verificationCode"
                  label="Verification Code"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
                <div
                  className="verification-items"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div className="Vbuttons">
                    <button id="verifyB" type="submit">
                      Verify
                    </button>

                    <button
                      id="cancel"
                      type="button"
                      value="cancel"
                      onClick={handleCancelVerification}
                    >
                      Cancel
                    </button>
                  </div>
                  <span id="resendCode" onClick={() => navigate("/sendVerify")}>
                    resend code ?
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
      <img src={logo} alt="" className="img-log" />
    </div>
  );
};

export default SignUp;
