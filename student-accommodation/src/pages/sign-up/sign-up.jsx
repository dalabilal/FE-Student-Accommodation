import Input from '../../component/input/input.component'
import './sign-up.css'
  
const SignUp = () => {
  return (
    <div className="main">
      <div className="sign-up-form">
        <div className="title">
          <span>Sign Up</span>
        </div>
        <Input
        label='first name'
        Type='textArea'
        Radius={15}
        Height={30}
        Width={160}
        />
        <Input
        label='last name'
        Type='textArea'
        Radius={15}
        Height={30}
        Width={160}
        />
        <Input
        label='email'
        Type='text'
        />
        <Input
        label='phone number'
        Type='number'
        />
        <Input
        label='password'
        Type='text'
        />
        <Input
        label='confirm password'
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
      </div>
    </div>
  )
}

export default SignUp
