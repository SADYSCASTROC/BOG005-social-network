import { createUser, saveUserInfo } from '../lib/firebase/firebaseService.js';

export const register = () => {
	const registrar = document.createElement('section');
	registrar.className = 'register';
	registrar.innerHTML = `
      <div class="container">
                <figure class="imageDescription">
                        <img class="imgLogo" src="IMG/Explore-removebg-preview.png">
                        <h1 class="Title">Register</h1>
                </figure>
                <form action=""  id="registerForm" class="Form">
                          <input type="text" name="" id="nameRegister" class="texField" placeholder="Name">
                          <input type="text" name="" id="emailRegister" class="texField" placeholder="Gmail">
                           <p id="EmailInUse">Email in use</p>
                          <input type="password" pattern=".{6,}" name="" id="passwordRegister" class="texField" placeholder="Password">
                          <button  class="button" type="submit">Registrarse</button>
                          <p class="youAreMember">You are a member? <a href="#login" class="a">Login</a></p>
                 </form>
       `;

	const emailInUse = registrar.querySelector('#EmailInUse');
	const registerForm = registrar.querySelector('#registerForm');
	const registerUsername = registrar.querySelector('#nameRegister');
	const registerEmail = registrar.querySelector('#emailRegister');
	const registerPassword = registrar.querySelector('#passwordRegister');

	emailInUse.style.display = 'none';
	registerForm.addEventListener('submit', () => {
		createUser(registerEmail.value, registerPassword.value)
			.then((userCredential) => {
				// console.log("token "+userCredential["user"]["accessToken"])
				const user = userCredential.user;
				saveUserInfo(registerUsername.value, user.email, user.uid);
				alert('usuario registrado correctamente');
				window.location.hash = '#wall';
			})
			.catch((error) => {
				const errorCode = error.code;
				console.log(errorCode);
				if (errorCode == 'auth/email-already-in-use') {
					emailInUse.style.display = 'block';
				}
			});
	});
	return registrar;
};
