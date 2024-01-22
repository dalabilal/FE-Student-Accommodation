import { useState } from 'react';
import './sign-up.css'
import PasswordStrengthMeter from './PasswordStrengthMeter';
import Input from '../../component/common/input/input.component';
import { Eye } from '@phosphor-icons/react/dist/ssr';
import { EyeClosed } from '@phosphor-icons/react';

const StrongPassword = ({ setPassword, setConfirmPassword, passwordsMatch , setPasswordsMatch }) => {
  const [password, setPasswordLocal] = useState('');
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const meetsPasswordCriteria = () => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const getPasswordStrengthLabel = () => {
    if (password.length < 8) {
      return 'Weak';
    }

    if (meetsPasswordCriteria()) {
      return 'Strong';
    }

    return 'Medium';
  };

  const getPasswordStrengthColor = () => {
    if (password.length < 8) {
      return '#EA1111'; // Red for weak passwords
    }

    if (meetsPasswordCriteria()) {
      return '#00b500'; // Green for strong passwords
    }

    return '#FFAD00'; // Orange for medium passwords
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPasswordLocal(newPassword);
    setPassword(newPassword);
    setConfirmPassword('');
  };

  return (
    <div className="container1">
      <div className="col-md-6 mx-auto text-right">
        <div className="form-group mb-1">
          <Input
            className="form-control-shadow-none"
            label="Password"
            placeholder="***************"
            onChange={handlePasswordChange}
            type={show ? 'text' : 'password'}
            required
          />
          <span style={{ color: '#A3C195' }} onClick={() => setShow(!show)}>
            {show ? <Eye size={30} color="black" /> : <EyeClosed size={30} color="black" />}
          </span>
        </div>
        {password && (
          <PasswordStrengthMeter
            label={getPasswordStrengthLabel()}
            color={getPasswordStrengthColor()}
          />
        )}
        <div className="form-group mb-1">
          <Input
            className={`form-control shadow-none ${!passwordsMatch ? 'password-mismatch' : ''}`}
            label="Confirm Password"
            placeholder="***************"
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              setPasswordsMatch(true)
            }}
            type={show1 ? 'text' : 'password'}
            required
          />
          <span style={{ color: '#A3C195' }} onClick={() => setShow1(!show1)}>
            {show1 ? <Eye size={30} color="black" /> : <EyeClosed size={30} color="black" />}
          </span>
          {/* {!passwordsMatch && <p style={{ color: 'red' }}>Passwords do not match!</p>} */}
        </div>
      </div>
    </div>
  );
};

export default StrongPassword;
