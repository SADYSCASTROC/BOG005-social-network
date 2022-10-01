 import { createUser,saveUserInfo } from '../lib/firebase/firebaseService.js';

export const register = () => {
  const registrar = document.createElement('section');

  registrar.className = 'register';
  registrar.innerHTML = `
       
        <figure class="imageDescription">
        <img class="imgLogo" src="IMG/Explore-removebg-preview.png">
        <h1 class="Title">Create Account </h1>
        </figure> 
        <form action=""  id="registerForm" class="Form">
        <input type="text" name="" id="nameRegister" class="texField" placeholder="Name">
          <input type="text" name="" id="emailRegister" class="texField" placeholder="Email">
          <p id="mailInSuso">Gmail in use</p>
          <input type="password" pattern=".{6,}" name="" id="passwordRegister" class="texField" placeholder="Password">
          <button  class="button "  "type="submit">
          Sign up</button>
          <p class="youAreMember">
          Are you already a member?</p>
          <p class="startSession"> <a href="#login" class="a">
          Login</a> </p>
        </form>
       
       `;
  const emailUSo = registrar.querySelector('#mailInSuso');

  const registerForm = registrar.querySelector('#registerForm');
  const registerEmail = registrar.querySelector('#emailRegister');
  const registerPassword = registrar.querySelector('#passwordRegister');


  registerForm.addEventListener('submit', () => {

    createUser(registerEmail.value, registerPassword.value)

      saveUserInfo(registerUsername.value, user.email, user.uid);
       alert("usuario registrado correctamente")

      window.location.hash ='#wall';
    })
    .catch((error) => {
      const errorCode = error.code;
       console.log(errorCode);
     
    });

  emailUSo.style.display = 'none';
  registerForm.addEventListener('submit', () => {
    createUser(registerEmail.value, registerPassword.value)
      .then((userCredential) => {
      // console.log("token "+userCredential["user"]["accessToken"])
        const user = userCredential.user;
        saveUserInfo(user.email, user.email, user.uid);
        // alert('usuario registrado correctamente');

        window.location.hash = '#wall';
      })
      .catch((error) => {
        const errorCode = error.code;
        if(errorCode === "auth/email-already-in-use"){

          emailUSo.style.display = 'block';
        }
      });


  });
  return registrar;
};
