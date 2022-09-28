import { googleSignIn, saveUserInfo, loginUser } from '../lib/firebase/firebaseService.js';

export const login = () => {
  const sectionLogin = document.createElement('section');
  sectionLogin.className = 'sectionLogin';
  sectionLogin.innerHTML = `
	<div class="container">
		<figure class="imageDescription">
			<img class="imgLogo" src="IMG/Explore-removebg-preview.png">
      <h1>Lo gin </h1>
		</figure>
    
		<form class="formDatos">
			<input type="text" name="" id="emailLogin" class="texField" placeholder="Email">
			<input type="password" pattern=".{6,}" name="" id="passwordLogin" class="texField" placeholder="Password">
			
			<button class="buttonStar" type="submit">
      Log in</button>
		</form>
    <br>
    <p></p>
    <div class="containerButton">
		<button class=" googleLogin" "type="submit">
    <img class="imgGoogle" src="IMG/google.png">
     <p class="startWithGoogle"> start with google</p>
    </button>
		<p class="registerText">You do not have an account?<a href="#register" class="a">
    Sign up</a></p>
    </div>

	</div>;      
  
   </section>`;

  const loginForm = sectionLogin.querySelector('.formDatos');
  const loginEmail = sectionLogin.querySelector('#emailLogin');
  const loginPassword = sectionLogin.querySelector('#passwordLogin');

  loginForm.addEventListener('submit', () => {
    loginUser(loginEmail.value, loginPassword.value)
      .then((result) => {
		  // console.log("token "+userCredential["user"]["accessToken"])
		  console.log(result);

	      loginForm.result;
		    window.location.hash = '#wall';
		    loginForm.reset();
      })
      .catch((error) => {
        const errorCode = error.code;
			 //console.log(errorCode);
			 if (errorCode === 'auth/user-not-found') {
          console.log('corre no registrado');
			 }else if(errorCode === 'auth/wrong-password'){
       // console.log("contraseña invalida")
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
