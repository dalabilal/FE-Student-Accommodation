import { useState } from "react";
import "./sign-up.css";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import InputPassword from "../../component/common/input-password/inputpassword.component";

const StrongPassword = ({
  setPassword,
  setConfirmPassword,
  passwordsMatch,
  setPasswordsMatch,
}) => {
  const [password, setPasswordLocal] = useState("");

  const meetsPasswordCriteria = () => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const getPasswordStrengthLabel = () => {
    if (password.length < 8) {
      return "Weak";
    }

    if (meetsPasswordCriteria()) {
      return "Strong";
    }

    return "Medium";
  };

  const getPasswordStrengthColor = () => {
    if (password.length < 8) {
      return 'rgb(234 17 17 / 51%)'; // Red for weak passwords
    }

    if (meetsPasswordCriteria()) {
      return 'rgb(0 181 0 / 49%)'; // Green for strong passwords
    }

    return 'rgb(255 173 0 / 48%)'; // Orange for medium passwords
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPasswordLocal(newPassword);
    setPassword(newPassword);
    setConfirmPassword("");
  };

  return (
    <div className="container1">
      <div className="col-md-6 mx-auto text-right">
        <div className="form-group-mb-1">
          <InputPassword
            className="form-control-shadow-none"
            label="Password"
            placeholder="***************"
            onChange={handlePasswordChange}
            required
          />
        </div>
        {password && (
          <PasswordStrengthMeter
            label={getPasswordStrengthLabel()}
            color={getPasswordStrengthColor()}
          />
        )}
        <div className="form-group mb-1">
          <InputPassword
            className={`form-control shadow-none ${
              !passwordsMatch ? "password-mismatch" : ""
            }`}
            label="Confirm Password"
            placeholder="***************"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setPasswordsMatch(true);
            }}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default StrongPassword;
