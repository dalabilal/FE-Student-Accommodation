import { useState } from 'react'
import Input from '../../component/input/input.component'
import './sign-up.css'
import { signUpUser } from '../../service/user.sevice';
import { useNavigate } from 'react-router';
  
const SignUp = () => {
  const navigate = useNavigate();
  const [firstname , setFirstname] = useState();
  const [lastname , setLastname] = useState();
  const [email , setEmail] = useState();
  const [password , setPassword] = useState();
  const [phoneNumber , setPhoneNumber] = useState();

  const handelSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (email && password) {
      const user = await signUpUser(firstname, lastname, phoneNumber, email, password);

      // If Successful login, go to view page
      if (user) {
        navigate('/view', { replace: true });
      } else {
        alert("Email or Password are not correct! Please try again.");
      }
    }
  };

  return (
    <div className="main">
      <form className="sign-up-form">
        <div className="title" onSubmit={handelSubmit}>
          <span>Sign Up</span>
        </div>
        <Input
        label='first name'
        required
        Type='textArea'
        Radius={15}
        Height={30}
        Width={160}
        onChange={(e) => setFirstname(e.target.value)}
        />
        <Input
        label='last name'
        required
        Type='textArea'
        Radius={15}
        Height={30}
        Width={160}
        onChange={(e) => setLastname(e.target.value)}
        />
        <Input
        label='email'
        required
        Type='text'
        onChange={(e) => setEmail(e.target.value)}
        />
        <Input
        label='phone number'
        required
        Type='number'
        onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Input
        label='password'
        required
        Type='text'
        onChange={(e) => setPassword(e.target.value)}
        />
        <Input
        label='confirm password'
        required
        Type='text'
        />
        <div className="signIn-button">
          <button>Sign Up</button>
        </div>
        <div className="sign-in-img">
        </div>
        <div className="img-signin">
          <img src="pic.jpg" alt="" />
        </div>
      </form>
    </div>
  )
}

export default SignUp
