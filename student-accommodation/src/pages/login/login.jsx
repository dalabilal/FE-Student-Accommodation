import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../component/common/input/input.component';
import { useUser } from '../../service/UserContext'
import './login.css';
import useNotification from '../../hook/notification.hook';
import { Eye } from '@phosphor-icons/react/dist/ssr';
import { EyeClosed } from '@phosphor-icons/react';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { setUserRole,setNoUser } = useUser(); // Get setUserRole from the context
  const { setNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3005/signin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json(); 
        sessionStorage.setItem('jwtToken', userData.token);
        sessionStorage.setItem('username', userData.firstname);
        sessionStorage.setItem('userRole', userData.role);
        setUserRole(userData.role);
        setNotification({ message: 'Login successful!', status: 'success' })
        navigate('/')
      } else {
        setError('Invalid email or password');
        setNotification({ message: 'Invalid email or password, Try again', status: 'error' })
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setNoUser(true);
  };

  
  useEffect(() => {
    setError(''); // Reset error state when the email or password changes
  }, [email, password]);

  return (
    <div className="main">
      <div className="sign-in-form">
        <div className="title">
          <span>Sign In</span>
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            label='Email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label='Password'
            value={password}
            placeholder="************"
            onChange={(e) => setPassword(e.target.value)}
            type={show ? 'text' : 'password'}
            required
          />
          <span style={{ color: '#A3C195' }} onClick={() => setShow(!show)}>
            {show ? <Eye size={30} color="black" /> : <EyeClosed size={30} color="black" />}
          </span>
          <div className="forgot-password">
            <span>forgot password?</span>
          </div>
          <div className="signIn-button">
            <button type="submit">Sign In</button>
          </div>
        </form>
        <div className="span-text">
          <span className="condition">You Don't have an account yet?</span>
          <span className="sign-up">
            <Link to={'/signup'}>Sign up</Link>
          </span>
        </div>
      </div>
      <div className="sign-in-img"></div>
      <div className="img-signin">
        <img src="pic.jpg" alt="" />
      </div>
    </div>
  );
};

export default SignInForm;
