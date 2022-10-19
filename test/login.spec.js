/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
import { login } from '../src/components/login.js';
import { googleSignIn } from '../src/lib/firebase/firebaseService.js';

jest.mock('../src/lib/firebase/firebaseService.js');

describe('login', () => {
  it('Check Google event works', () => {
    const view = login();
    const googleButton = view.querySelector('.googleLogin');
    googleButton.dispatchEvent(new Event('click'));
    expect(googleSignIn).toBeCalled(
      document.body.innerHTML = '<main id="root"></main>',
      window.location.hash = '#login',
    ),
    expect(document.querySelector('h1.walltitle').textContent).toBe('Tell your experience');
  });
});
