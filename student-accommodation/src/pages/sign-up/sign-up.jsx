import { useState } from 'react'
import Input from '../../component/input/input.component'
import './sign-up.css'
import { useNavigate } from 'react-router-dom';

  
const SignUp = () => {

  const [firstname , setFirstname] = useState();
  const [lastname , setLastname] = useState();
  const [email , setEmail] = useState();
  const [password , setPassword] = useState();
  const [phoneNumber , setPhoneNumber] = useState();
  const [role , setRole] = useState();
  const [show , setShow] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Example: At least 8 characters, 1 letter, and 1 number

    if (passwordRegex.test(password)) {
      // Password doesn't meet criteria, handle the scenario (e.g., show an error message)
      alert('Password does not meet the required criteria');
      return;
    }
    try {
      const response = await fetch('http://localhost:3004/signup/', {
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
          role
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
    navigate('/');
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
        // Type='textArea'
        Radius={15}
        Height={30}
        Width={160}
        onChange={(e) => setFirstname(e.target.value)}
        />
        <Input
        label='last name'
        required
        // Type='textArea'
        Radius={15}
        Height={30}
        Width={160}
        onChange={(e) => setLastname(e.target.value)}
        />
        <Input
        label='email'
        required
        // Type='text'
        onChange={(e) => setEmail(e.target.value)}
        />
        <Input
        label='phone number'
        required
        // Type='number'
        onChange={(e) => setPhoneNumber(e.target.value)}
        />
         <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="" disabled>
            Role
          </option>
          <option value="owner">Owner</option>
          <option value="student">Student</option>
        </select>
        <Input
        label='password'
        required
        type={
          show ? "text" : "password"
      }
        onChange={(e) => setPassword(e.target.value)}
        />
        <Input
        label='confirm password'
        required
        type={
          show ? "text" : "password"
      }
        />
        <span style={{ color: '#A3C195' }} onClick={()=>setShow(!show)}>show password?  </span>
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
