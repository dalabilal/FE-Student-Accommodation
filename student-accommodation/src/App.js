import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './service/UserContext';

import AllAccomodation from './pages/All-accomodation/AllAccomodation';
import Notification from './notification/notification.component';
import ProtectedUsers from './pages/protected/ProtectedUsers';
import Profile from './pages/user-profile/Profile';
import Favorite from './pages/Favorite/Favorite';
import NotFound from './pages/Not-found/NotFound';
import HomePage from './pages/HomePage/homePage';
import SignUp from './pages/sign-up/sign-up';
import SignInForm from './pages/login/login';

import NavBar from './component/common/navBar/NavBar';
import Guard from './component/guard/guard';

function App() {
 return (
  <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signin' element={<SignInForm/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/all' element={<AllAccomodation/>}/>
        <Route path='/favorite' element={<Favorite/>}/>
        <Route path='/allusers' element={<Guard permittedRoles={['owner']}><ProtectedUsers /></Guard>} />
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
    <Notification/>
   </UserProvider>
 );
}

export default App;