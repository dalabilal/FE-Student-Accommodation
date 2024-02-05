import Input from "../../component/common/input/input.component";
import useNotification from "../../hook/notification.hook";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../service/UserContext";
import logo from "../../assests/logo.jpg";
import Home from "../../assests/home.png";
import "./EmailVerification.css";

const EmailVerification = () => {
  const { setNotification } = useNotification();
  const navigate = useNavigate();
  const { emailVerify, setEmailVerify } = useUser();

  const handleSendEmail = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://localhost:3005/sendEmail/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailVerify }),
      });

      if (response.status === 200) {
        setNotification({
          message: "Verification code sent , check your email!",
          status: "success",
        });
        navigate("/verification");
      } else {
        setNotification({ message: "email Not Found", status: "error" });
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
          <span style={{ fontSize: 20 }}>Please Enter your email below</span>
        </div>
        <form
          className="emailVerificationForm"
          onSubmit={handleSendEmail}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Input
            label="Enter your Email"
            type="text"
            value={emailVerify}
            onChange={(e) => setEmailVerify(e.target.value)}
            required
          />
          <button type="submit" id="send-code">
            Send Code
          </button>
        </form>
      </div>
      <img src={logo} alt="" className="img-log" />
    </div>
  );
};

export default EmailVerification;
