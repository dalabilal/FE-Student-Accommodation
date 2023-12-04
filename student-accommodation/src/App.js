import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/homePage';
import SignInForm from './pages/login/login';
import SignUp from './pages/sign-up/sign-up';

function App() {
 return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signin' element={<SignInForm/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>

 );
}

export default App;