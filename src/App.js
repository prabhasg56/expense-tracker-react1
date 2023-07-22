import {Routes, Route} from 'react-router-dom'; 
import SignUpForm from './pases/SignUpForm';
import SignInForm from './pases/SignInForm';
import WelcomePage from './pases/WelcomePage';
import ProfilePage from './pases/ProfilePage';


function App() {
  return (
    < >
    <Routes>
      <Route path='/' element={<SignUpForm/>}/>
      <Route path='/signin' element={<SignInForm/>}/>
      <Route path='/welcome' element={<WelcomePage/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>
    </Routes>
    </>
  );
}

export default App;
