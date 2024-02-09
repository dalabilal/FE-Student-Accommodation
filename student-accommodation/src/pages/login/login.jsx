import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../service/UserContext";
import useNotification from "../../hook/notification.hook";
import InputPassword from "../../component/common/input-password/inputpassword.component";
import logo from "../../assests/logo.jpg";
import Input from "../../component/common/input/input.component";
import Home from "../../assests/home.png";
import "./login.css";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setNotification } = useNotification();
  const { setUserRole, setNoUser, verificationCode, setEmailVerify } =
    useUser();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    if (!validateEmail(email)) {
      setNotification({ message: "Invalid email format", status: "error" });
      return;
    }

    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3005/signin/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, verificationCode }),
      });


      if (response.ok) {
        const userData = await response.json();
        if(userData.status === 'pending') {
          setNotification({ message: "can't login until your account active by the owner", status: '4335' });
          return;
        }
        sessionStorage.setItem('jwtToken', userData.token);
        sessionStorage.setItem('username', userData.firstname);
        sessionStorage.setItem('userID', userData._id);
        sessionStorage.setItem('userRole', userData.role);
        setNotification({ message: 'Login successful!', status: 'success' });
        setUserRole(userData.role);
        navigate("/");
      } else {
        const errorData = await response.json();
        if (errorData && errorData.message === "You should verifiy yourself") {
            setEmailVerify(email);
            navigate("/verification");
            setNotification({
              message:
                "You should verifiy yourself",
              status: "warning",
            });
        } else
        if (errorData && errorData.message === "Invalid credentials") {
          setNotification({
            message: "Invalid email or password, Try again",
            status: "error",
          });
        } else if (
          errorData &&
          errorData.message ===
            "Verification code sent to your email. Enter the code to proceed."
        ) {
          setEmailVerify(email);
          navigate("/verification");
          setNotification({
            message:
              "Verification code sent to your email. Enter the code to proceed.",
            status: "warning",
          });
        } else {
          setNotification({
            message: "there is no account with this email",
            status: "warning",
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification({
        message: "there is no account with this email",
        status: "warning",
      });
    }
    setNoUser(true);
  };

  return (
    <div className="main">
      <img
        src={Home}
        alt="homepage"
        className="img-sign"
        onClick={() => navigate("/")}
      />
      <div className="sign-in-form">
        <div className="title">
          <span>Sign In</span>
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputPassword
            label="Password"
            value={password}
            placeholder="************"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="forgot-password">
            <span id="forgot-password" onClick={() => navigate("/sendVerify")}>
              forgot password?
            </span>
          </div>
          <div className="span-text">
            <span className="condition">You Don't have an account yet?</span>
            <span className="sign-up">
              <Link to={"/signup"}>Sign up</Link>
            </span>
          </div>
          <div className="signIn-button">
            <button type="submit">Sign In</button>
          </div>
        </form>
      </div>
      <img src={logo} alt="" className="img-log" />
    </div>
  );
};

export default SignInForm;
