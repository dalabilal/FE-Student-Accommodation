import { useState } from 'react'
import Input from '../../component/input/input.component'
import './sign-up.css'
import { signUpUser } from '../../service/user.sevice';
import { useNavigate } from 'react-router';
  
const SignUp = () => {

  const [firstname , setFirstname] = useState();
  const [lastname , setLastname] = useState();
  const [email , setEmail] = useState();
  const [password , setPassword] = useState();
  const [phoneNumber , setPhoneNumber] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/signup', {
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
        }),
      });

      if (response.status === 201) {
        // Successful signup, handle as needed (e.g., redirect)
        console.log('User signed up successfully!');
      } else {
        // Handle error scenario (e.g., display error message)
        console.error('Failed to sign up');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="main">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <div className="title" >
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
