import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../component/input/input.component';
import './login.css'

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3004/signin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Login successful - Redirect or perform action
        console.log('Login successful!');
        // Perform actions after successful login, e.g., redirect to a different page
      } else {
        // Login failed - Show error message
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    navigate('/');
  };

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
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <div className="forgot-password">
            <span>forgot password?</span>
          </div>
          <div className="signIn-button">
            <button type="submit">Sign In</button>
          </div>
        </form>
        <div className="span-text">
          <span className="condition">Don't have an account?</span>
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
