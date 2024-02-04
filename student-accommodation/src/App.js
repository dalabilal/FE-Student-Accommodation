import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './service/UserContext';

import EmailVerification from './pages/email-verification/EmailVerification';
import AllAccomodation from './pages/All-accomodation/AllAccomodation';
import ViewHousing from './pages/view-details-housing/view-housing';
import ResetPassword from './pages/reset-password/resetPassword';
import Notification from './notification/notification.component';
import ProtectedUsers from './pages/protected/ProtectedUsers';
import Verification from './pages/verification/verification';
import PaymentForm from './pages/payment-form/PaymentForm';
import Profile from './pages/user-profile/Profile';
import Favorite from './pages/Favorite/Favorite';
import NotFound from './pages/Not-found/NotFound';
import HomePage from './pages/HomePage/homePage';
import SignUp from './pages/sign-up/sign-up';
import SignInForm from './pages/login/login';

import NavBar from './component/common/navBar/NavBar';
import Guard from './component/guard/guard';
import GuardFav from './component/guard-fav/guard';
import Admin from './pages/admin-panel/Admin';
import GuardAdmin from './component/guard-admin/guardadmin';

function App() {
 return (
  <UserProvider>
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signin' element={<SignInForm/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/all' element={<AllAccomodation/>}/>
        <Route path='/all/:id' element={<ViewHousing/>}/>
        <Route path='/favorite' element={<GuardFav permittedRoles={['student']}><Favorite/></GuardFav>}/>
        <Route path='/allusers' element={<Guard permittedRoles={['owner']}><ProtectedUsers /></Guard>} />
        <Route path='/*' element={<NotFound/>}/>
        <Route path='/verification' element={<Verification/>}/>
        <Route path='/sendVerify' element={<EmailVerification/>}/>
        <Route path='/payment' element={<PaymentForm/>}/>
        <Route path='/reset' element={<ResetPassword/>}/>
        <Route path='/admin' element={<GuardAdmin permittedRoles={['admin']}><Admin/></GuardAdmin>}/>
      </Routes>
    </BrowserRouter>
    <Notification/>
   </UserProvider>
 );
}

export default App;