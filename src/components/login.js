import { googleSignIn, saveUserInfo, loginUser } from '../lib/firebase/firebaseService.js';

export const login = () => {
	const sectionLogin = document.createElement('section');
	sectionLogin.className = 'sectionLogin';
	sectionLogin.innerHTML = `

	<figure class="imageDescription">
	   <img class="imgLogo" src="IMG/Explore-removebg-preview.png">
	   <h1 class="Title">Login</h1>
    </figure>
          <form class="formDatos Form">
	   <input type="text" name="" id="emailLogin" class="texField" placeholder="Email">
	   <p id="gmailNotFound">gmail not found</p>
	   <input type="password" pattern=".{6,}" name="" id="passwordLogin" class="texField" placeholder="Password">
	   <p id="invalidPassword">Invalid password</p>
	   <button class="button" type="submit">Login</button>
          </form>
          <button class="googleLogin" "type=" submit">
	  <img class="googleimg" src="IMG/google.png">
	  <p class="starGoogle">Start with google</p>
          </button>
          <p class="notAccount">
	  You do not have an account?<a href="#register" class="a">Sign up</a></p>
          </section>`
;
	const invalidPasswor = sectionLogin.querySelector('#invalidPassword');
	const gmailNotFoun = sectionLogin.querySelector('#gmailNotFound');
	const loginForm = sectionLogin.querySelector('.formDatos');
	const loginEmail = sectionLogin.querySelector('#emailLogin');
	const loginPassword = sectionLogin.querySelector('#passwordLogin');
	gmailNotFoun.style.display = 'none';
	invalidPasswor.style.display = 'none';
	loginForm.addEventListener('submit', () => {
		loginUser(loginEmail.value, loginPassword.value)
			.then(() => {

				// console.log("token "+userCredential["user"]["accessToken"])
				loginForm.reset();
				window.location.hash = '#wall';
			})
			.catch((error) => {
				const errorCode = error.code;
				if (errorCode === 'auth/user-not-found') {
					gmailNotFoun.style.display = 'block';
				} else if (errorCode === 'auth/wrong-password') {
					invalidPasswor.style.display = 'block';
				}
			});
	});
	const googleButt = sectionLogin.querySelector('.googleLogin');
	googleButt.addEventListener('click', () => {
		googleSignIn()
			.then((result) => {
				const user = result.user;
				window.location.hash = '#wall';
				saveUserInfo(user.email, user.email, user.uid);
			});
	});
	return sectionLogin;
};
