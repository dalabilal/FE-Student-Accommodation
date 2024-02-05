import Input from "../../component/common/input/input.component";
import useNotification from "../../hook/notification.hook";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./verification.css";
import { useUser } from "../../service/UserContext";
import logo from "../../assests/logo.jpg";
import Home from "../../assests/home.png";

const Verification = (props) => {
  const { setNotification } = useNotification();
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();
  const { verificationCode, setVerificationCode, emailVerify } = useUser();

  const handleVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:3005/verify/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailVerify,
          verificationCode: verificationCode,
        }),
      });

      if (response.ok) {
        setPopup(!popup);
        setNotification({
          message: "Verification code are correct",
          status: "sucess",
        });
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
          <span style={{ fontSize: 20 }}>
            check your email please and enter the code
          </span>
        </div>
        <form onSubmit={handleVerification}>
          {popup ? (
            <>
              <button type="button" onClick={() => navigate("/signin")}>
                signin Again
              </button>
              <button type="button" onClick={() => navigate("/reset")}>
                reset Password
              </button>
            </>
          ) : (
            <>
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
                <button id="verify" type="submit">
                  Verify
                </button>
                <span id="resendCode" onClick={() => navigate("/sendVerify")}>
                  resend code ?
                </span>
              </div>
            </>
          )}
        </form>
      </div>
      <img src={logo} alt="" className="img-log" />
    </div>
  );
};

export default Verification;
