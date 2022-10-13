import { showSection } from '../src/main.js';

jest.mock('../src/lib/firebase/firebaseService.js');

describe('showSection', () => {
  it('comprobando login', () => {
      document.body.innerHTML = `<main id="root"></main>`;
      window.location.hash = '#login';
      showSection();
      expect(document.querySelector('h1.Title').textContent).toBe('Login');
  });
});

it('showSection', () => {
  // eslint-disable-next-line quotes
  document.body.innerHTML = `<div id="root"></div>`;
  window.location.hash = '#register';
  showSection();
  expect(document.querySelector('h2.register__title').textContent).toBe('Create account');
});
});
