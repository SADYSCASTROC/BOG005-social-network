
import { googleSignIn, saveUserInfo, loginUser } from '../lib/firebase/firebaseService.js';

export const login = () => {
	const sectionLogin = document.createElement('section');
	sectionLogin.className = 'sectionLogin';
	sectionLogin.innerHTML = `<section class="login">
	<div class="container">
		<figure class="imagenDescripcion">
			<img class="imgLogo" src="IMG/Explore-removebg-preview.png">
			<figcaption>Leyenda de imágen del contenido de la pagina</figcaption>
		</figure>
		<form class="formDatos">
			<input type="text" name="" id="emailLogin" class="camapoTexto" placeholder="Correo" required>
			<input type="password" pattern=".{6,}" name="" id="passwordLogin" class="camapoTexto" placeholder="Contraseña" required>
			<p id="passwordhidden">las credenciales no coinciden</p>
			<button class="buttonIniciar" type="submit">Iniciar sesion</button>
		</form>
		<button class="button googleLogin" "type="submit">Google</button>
		<p class="registrarse">¿No tienes cuenta?<a href="#register">Registrate</a></p>


	</div>;      
  
   </section>`;

	const loginForm = sectionLogin.querySelector('.formDatos');
	const loginEmail = sectionLogin.querySelector('#emailLogin');
	const loginPassword = sectionLogin.querySelector('#passwordLogin');

	loginForm.addEventListener('submit', (event) => {


		loginUser(loginEmail.value, loginPassword.value)
			.then((result) => {
				// console.log("token "+userCredential["user"]["accessToken"]) 
				console.log(result);

				loginForm.result
				window.location.hash = '#wall';
				loginForm.reset();
			})

			.catch((error) => {
				const errorCode = error.code;
				console.log(errorCode);
				if (errorCode === "auth/user-not-found") {
					console.log("corre no registrado")
				} else if (errorCode === "auth/wrong-password") {
					console.log("contraseña incorrecta")
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

}


