import React, { useState, useEffect } from "react";
import Input from "../../component/common/input/input.component";
import { useUser } from "../../service/UserContext";
import "./sign-up.css";
import { Link } from "react-router-dom";
import logo from "../../assests/logo.jpg";
import StrongPassword from "./passwordStrength";
import useNotification from "../../hook/notification.hook";
import ReCAPTCHA from "react-google-recaptcha";

// 6LcYZ1spAAAAADUyn0DCJOQ8vp0inpl3mLYdhW7b

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
  const { setNotification } = useNotification();
  const [capVal, setCapval] = useState(null);

  const { setNoUser, setUserRole } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      setEmailExists(false); // Reset emailExists state
      return;
    }

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
        const userData = await response.json();
        sessionStorage.setItem("jwtToken", userData.token);
        sessionStorage.setItem("userRole", role);
        sessionStorage.setItem("username", userData.firstname);
        console.log("User signed up successfully!");
        setNotification({
          message: "User is created successfully",
          status: "success",
        });
        setUserRole(role);
        console.log("role", role);
      } else {
        const responseData = await response.json();
        if (responseData.error) {
          if (responseData.error.message === "Email already exists") {
            setEmailExists(true);
            setNotification({
              message: "User is not created",
              status: "error",
            });
          } else if (responseData.error.message === "Passwords do not match") {
            setNotification({
              message: "User is not created",
              status: "error",
            });
            setPasswordsMatch(false);
          } else {
            console.error("Failed to sign up:", responseData.error.message);
            setNotification({
              message: "User is not created",
              status: "error",
            });
          }
        }
      }
    } catch (error) {
      setNotification({ message: "Server Error", status: "warning" });
      console.error("Error:", error);
    }
    setNoUser(true);
  };

  useEffect(() => {
    setEmailExists(false); // Reset emailExists state when the email changes
  }, [email]);

  return (
    <div className="main1">
      <form className="sign-up-form" onSubmit={handleSubmit}>
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
        />
        {!passwordsMatch && (
          <span id="notMatch" style={{ color: "red" }}>
            Passwords do not match!
          </span>
        )}
        <div className="span-text1">
          <span className="condition">already have an account, </span>
          <span className="signin">
            <Link to={"/signin"}>Sign in!</Link>
          </span>
        </div>
        <div className="signIn-button">
          <button disabled={!capVal}>Sign Up</button>
        </div>
      </form>

      <ReCAPTCHA
        id="capcha"
        sitekey="6LcYZ1spAAAAADUyn0DCJOQ8vp0inpl3mLYdhW7b"
        onChange={(val) => setCapval(val)}
        style={{ float: "right", marginRight: "10px" }}
      />

      <img src={logo} alt="" className="img-log" />
    </div>
  );
};

export default SignUp;
