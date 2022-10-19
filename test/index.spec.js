import { showSection } from '../src/main.js';

jest.mock('../src/lib/firebase/firebaseService.js');

describe('showSection', () => {
  it('comprobando login', () => {
    document.body.innerHTML = '<main id="root"></main>';
    window.location.hash = '#login';
    showSection();
    expect(document.querySelector('h1.Title').textContent).toBe('Login');
  });
  it('probando registro', () => {
    document.body.innerHTML = '<main id="root"></main>';
    window.location.hash = '#register';
    showSection();
    expect(document.querySelector('h1.Title').textContent).toBe('Register');
  });
  it('comprobando wall', () => {
    document.body.innerHTML = '<main id="root"></main>';
    window.location.hash = '#wall';
    showSection();
    expect(document.querySelector('h1.walltitle').textContent).toBe('Tell your experience');
  });
  it('comprobando welcome', () => {
    document.body.innerHTML = '<main id="root"></main>';
    window.location.hash = '';
    showSection();
    expect(document.querySelector('h1.titleWlcm').textContent).toBe('Welcome to the page');
  });
});
