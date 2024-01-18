import React, { useState } from 'react';
import Input from '../../component/common/input/input.component';
import { useUser } from '../../service/UserContext';
import './sign-up.css';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [role, setRole] = useState();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { setUserRole } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (passwordRegex.test(password)) {
      alert('Password does not meet the required criteria');
      return;
    }
    try {
      const response = await fetch('http://localhost:3005/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
          phoneNumber,
          role,
        }),
      });

      if (response.status === 201) {
        console.log('User signed up successfully!');
        setUserRole(role);
        console.log('role', role);
      } else {
        console.error('Failed to sign up');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    navigate('/');
  };

  return (
    <div className="main">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <div className="title">
          <span>Sign Up</span>
        </div>
        <Input
          label="first name"
          required
          radius={15}
          height={30}
          width={160}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <Input
          label="last name"
          required
          radius={15}
          height={30}
          width={160}
          onChange={(e) => setLastname(e.target.value)}
        />
        <Input label="email" required onChange={(e) => setEmail(e.target.value)} />
        <Input
          label="phone number"
          required
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <div className="role-radio">
          <label className="role">Are you  : </label>
          <label>
            <input
              type="radio"
              value="owner"
              checked={role === 'owner'}
              onChange={() => setRole('owner')}
            />
            <span className="radiol-label">Owner</span>
          </label>
          <label>
            <input
              type="radio"
              value="student"
              checked={role === 'student'}
              onChange={() => setRole('student')}
            />
            <span className="radio-label">Student</span>
          </label>
        </div>
        <Input
          label="password"
          required
          type={show ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          label="confirm password"
          required
          type={show ? 'text' : 'password'}
        />
        <span style={{ color: '#A3C195' }} onClick={() => setShow(!show)}>
          show password?{' '}
        </span>
        <div className="span-text1">
        <span>already have an account, </span>
        <span className='signin'>
          <Link to={'/signin'}>Sign in!</Link>
        </span>
        </div>
        <div className="signIn-button">
          <button>Sign Up</button>
        </div>
        <div className="sign-in-img"></div>
        <div className="img-signin">
          <img src="pic.jpg" alt="" />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
