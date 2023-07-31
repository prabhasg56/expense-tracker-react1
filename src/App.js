import {Routes, Route, Navigate} from 'react-router-dom'; 
import { useState } from 'react';
import ReactDOM from "react-dom";
import { useSelector } from 'react-redux';

import SignUpForm from './pases/SignUpForm';
import SignInForm from './pases/SignInForm';
import WelcomePage from './pases/WelcomePage';
import ProfilePage from './pases/ProfilePage';
import ForgotModal from './components/ForgotModal';


function App() {
  const [showModal, setShowMoadl] = useState(false);
  const isAuthentication = useSelector((state) => state.auth.isAuthentication);
  
  const showModalHandler = (show) => {
    setShowMoadl(show);
  }

  return (
    < >
    {ReactDOM.createPortal(
      <ForgotModal showModal = {showModal} showModalHandler={showModalHandler}/>,
      document.getElementById('forgot-modal')
    )}
    <Routes>
     <Route path='/' element={!isAuthentication ? <SignUpForm/> : <Navigate to = '/welcome'/>}/>
      <Route path='/signin' element={<SignInForm showModalHandler={showModalHandler}/>}/>
      <Route path='/welcome' element={isAuthentication ? <WelcomePage/> : <Navigate to = '/signin'/>}/>
      <Route path='/profile' element={isAuthentication ? <ProfilePage/> : <Navigate to = '/signin'/>}/>
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
    </>
  );
}

export default App;
