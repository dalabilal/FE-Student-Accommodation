import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AllAccomodation from './pages/All-accomodation/AllAccomodation';
import Favorite from './pages/Favorite/Favorite';
import HomePage from './pages/HomePage/homePage';
import SignInForm from './pages/login/login';
import SignUp from './pages/sign-up/sign-up';
import Users from './pages/AllUsers/Users';
import NotFound from './pages/Not-found/NotFound';
import Header from './component/Logo/Header';

function App() {
 return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signin' element={<SignInForm/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/all' element={<AllAccomodation/>}/>
        <Route path='/favorite' element={<Favorite/>}/>
        <Route path='/allusers' element={<Users/>}/>
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>

 );
}

export default App;