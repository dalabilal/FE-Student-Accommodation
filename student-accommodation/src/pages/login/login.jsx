import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../service/UserContext'
import './login.css';
import useNotification from '../../hook/notification.hook';
import InputPassword from '../../component/common/input-password/inputpassword.component';
import logo from '../../assests/logo.jpg'

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        setNotification({ message: 'Invalid email or password, Try again', status: 'error' })
      }
    } catch (error) {
      console.error('Error:', error);
      setNotification({ message: 'Server Error', status: 'warning' })
    }
    setNoUser(true);
  };


  return (
    <div className="main">
      <div className="sign-in-form">
        <div className="title">
          <span>Sign In</span>
        </div>
        <form onSubmit={handleSubmit}>
          <InputPassword
            label='Email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputPassword
            label='Password'
            value={password}
            placeholder="************"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="forgot-password">
            <span>forgot password?</span>
          </div>
        <div className="span-text">
          <span className="condition">You Don't have an account yet?</span>
          <span className="sign-up">
            <Link to={'/signup'}>Sign up</Link>
          </span>
        </div>
          <div className="signIn-button">
            <button type="submit">Sign In</button>
          </div>
        </form>
      </div>
      <img src={logo} alt="" className='img-log'/>
    </div>
  );
};

export default SignInForm;
