import {Routes, Route} from 'react-router-dom'; 
import { useState } from 'react';
import ReactDOM from "react-dom";
import SignUpForm from './pases/SignUpForm';
import SignInForm from './pases/SignInForm';
import WelcomePage from './pases/WelcomePage';
import ProfilePage from './pases/ProfilePage';
import ForgotModal from './components/ForgotModal';


function App() {
  const [showModal, setShowMoadl] = useState(false);

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
      <Route path='/' element={<SignUpForm/>}/>
      <Route path='/signin' element={<SignInForm showModalHandler={showModalHandler}/>}/>
      <Route path='/welcome' element={<WelcomePage/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>
    </Routes>
    </>
  );
}

export default App;
