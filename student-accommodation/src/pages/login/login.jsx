import React from 'react'
import './login.css';
import { Link } from 'react-router-dom';
import Input from '../../component/input/input.component';
const SignInForm = () => {
    return (
        <div className="main">
            <div className="sign-in-form">
                <div className="title">
                    <span>Sign In</span>
                </div>
                <Input
                label='name'
                />
                <Input
                label='password'
                />
                <div className="forgot-password">
                    <span >
                        forgot password?
                    </span>
                </div>
                <div className="signIn-button">
                    <button>Sign In</button>
                </div>
                <div className="span-text">
                    <span className="condition">
                        Don't have an account?
                    </span>
                    <span className="sign-up">
                        <Link to={'/signup'}>Sign up</Link> 
                    </span>
                </div>
            </div>
          <div className="sign-in-img">
             
          </div>
          <div className="img-signin">
            <img src="pic.jpg" alt="" />
          </div>
        </div>
    )
}

export default SignInForm
