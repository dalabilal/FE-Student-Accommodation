import React from 'react';
import SignInForm from './pages/login/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
 return (
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<SignInForm/>}/>
      </Routes>
    </BrowserRouter>

 );
}

export default App;