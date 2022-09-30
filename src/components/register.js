import { createUser, saveUserInfo } from '../lib/firebase/firebaseService.js';

export const register = () => {
  const registrar = document.createElement('section');

  registrar.className = 'register';

  registrar.innerHTML = `
      <div class="container">
      <figure class="imageDescription">
			<img class="imgLogo" src="IMG/Explore-removebg-preview.png">
      <h1>Create Account </h1>
      </figure> 
      <form action=""  id="registerForm"
      <input type="text" name="" id="nameRegister" class="texField" placeholder="Name">
        <input type="text" name="" id="emailRegister" class="texField" placeholder="Email">
        <input type="password" pattern=".{6,}" name="" id="passwordRegister" class="texField" placeholder="Password">
        <button  class="button register__button-google"  "type="submit">
        Sign up</button>
        <p class="youAreMember">
        Are you already a member?</p>
         <p class="startSession"> <a href="#login" class="a"> Login</a> </p>


      </form>
       
      </div> 
       `;
  const registerForm = registrar.querySelector('#registerForm');
  const registerUsername = registrar.querySelector('#nameRegister');
  const registerEmail = registrar.querySelector('#emailRegister');
  const registerPassword = registrar.querySelector('#passwordRegister');

  registerForm.addEventListener('submit', () => {

    createUser(registerEmail.value, registerPassword.value)
      .then((userCredential) => {
      // console.log("token "+userCredential["user"]["accessToken"])
        const user = userCredential.user;


        saveUserInfo(user.email, user.email, user.uid);
          alert('usuario registrado correctamente');

        window.location.hash = '#wall';
        // loginForm.reset();

      })
      .catch((error) => {
        const errorCode = error.code;
         console.log(errorCode);

      });
  });
  return registrar;
};
