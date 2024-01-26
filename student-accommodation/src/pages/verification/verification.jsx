// Verification component
import React from 'react';
import Input from '../../component/common/input/input.component';
import useNotification from '../../hook/notification.hook';
import { useNavigate } from 'react-router-dom';

const Verification = (props) => {
    const { setNotification } = useNotification();
    const navigate = useNavigate();

  const handleVerification = async () => {
    // Perform verification
    try {
      const response = await fetch('http://localhost:3005/verify/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: props.email, verificationCode: props.verificationCode }),
      });

      if (response.ok) {
        console.log(props.verificationCode );
        setNotification({ message: 'Verification code are correct', status: 'sucess' });
      } else {
        setNotification({ message: 'Verification code are not right', status: 'warning' });
      }
    } catch (error) {
      console.error('Error during verification:', error);
    }

    navigate('/signin')
  };

  return (
    <>
      {props.showVerificationCodeInput && (
        <>
          <Input
            id='verificationCode'
            label='Verification Code'
            type='text'
            value={props.verificationCode}
            onChange={(e) => props.setVerificationCode(e.target.value)}
            required
          />
          <button onClick={handleVerification}>Verify</button>
        </>
      )}
    </>
  );
};

export default Verification;
