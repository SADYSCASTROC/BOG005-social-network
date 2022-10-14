// importamos la funcion que vamos a testear
import { login } from '../src/components/login.js';
import { googleSignIn } from '../src/lib/firebase/firebaseService.js';

jest.mock('../src/lib/firebase/firebaseService.js');

describe('login', () => {
  it('comprobando evento de google', () => {
    const view = login();
    const googleButton = view.querySelector('.googleLogin');
    googleButton.dispatchEvent(new Event('click'));
    expect(googleSignIn).toBeCalled();
  });
});