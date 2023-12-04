import React from 'react'
import './homePage.css'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      home page
      <button onClick={()=> navigate('signin')}>SignIn</button>
      <button onClick={()=> navigate('SignUp')}>SignUp</button>
    </div>
  )
}

export default HomePage
