import {render, screen} from '@testing-library/react';
import SignInForm from '../pases/SignInForm';
import WelcomePage from '../pases/WelcomePage'

describe('SignIn page testing..', ()=> {
    test('Signin title ', () => {
      render(<WelcomePage/>)

      const signinText = screen.getByText('Welcome to expense tracker!!');

      expect(signinText).toBeInTheDocument();
    })
    
})