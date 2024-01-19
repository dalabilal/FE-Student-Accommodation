import { useState } from 'react';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import Input from '../../component/common/input/input.component';
import { Eye } from '@phosphor-icons/react/dist/ssr';
import { EyeClosed } from '@phosphor-icons/react';

const StrongPassword = () => {
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

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

  const handlePassword1Change = (e) => {
    const confirmPassword = e.target.value;
    setPassword1(confirmPassword);

    // Check if passwords match
    setPasswordsMatch(confirmPassword === password);
  };

  return (
    <div className="container1">
      <div className="col-md-6 mx-auto text-right">
        <div className="form-group mb-1">
          <Input
            className="form-control shadow-none"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            type={show ? 'text' : 'password'}
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
            onChange={handlePassword1Change}
            type={show1 ? 'text' : 'password'}
          />
          <span style={{ color: '#A3C195' }} onClick={() => setShow1(!show1)}>
            {show1 ? <Eye size={30} color="black" /> : <EyeClosed size={30} color="black" />}
          </span>
          {!passwordsMatch && <p style={{ color: 'red' }}>Passwords do not match!</p>}
        </div>
      </div>
    </div>
  );
};

export default StrongPassword;
