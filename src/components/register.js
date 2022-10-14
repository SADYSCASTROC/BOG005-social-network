import { createUser, saveUserInfo } from '../lib/firebase/firebaseService.js';

export const register = () => {
  const registrar = document.createElement('section');
  registrar.className = 'register';
  registrar.innerHTML = `
<<<<<<< Updated upstream
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
                          <button  class="button" type="submit">Register</button>
                          <p class="youAreMember">You are a member? <a href="#login" class="a">Login</a></p>
                 </form>
       `;

  const emailInUse = registrar.querySelector('#EmailInUse');
=======
        <div class="container">
        <figure class="imageDescription">
        <img class="imgLogo" src="IMG/Explore-removebg-preview.png">
        <h1>Create Account </h1>
        </figure> 
        <form action=""  id="registerForm">
        <input type="text" name="" id="nameRegister" class="texField" placeholder="Name">
          <input type="text" name="" id="emailRegister" class="texField" placeholder="Email">
          <p id="mailInSuso">Gmail in use</p>
          <input type="password" pattern=".{6,}" name="" id="passwordRegister" class="texField" placeholder="Password">
          <button  class="button register__button-google"  "type="submit">
          Sign up</button>
          <p class="youAreMember">
          Are you already a member?</p>
          <p class="startSession"> <a href="#login" class="a">
          Login</a> </p>
        </form>
       
      </div> 
       `;
  const emailUSo = registrar.querySelector('#mailInSuso');
>>>>>>> Stashed changes
  const registerForm = registrar.querySelector('#registerForm');
  const registerEmail = registrar.querySelector('#emailRegister');
  const registerPassword = registrar.querySelector('#passwordRegister');
<<<<<<< Updated upstream

  emailInUse.style.display = 'none';
=======
  emailUSo.style.display = 'none';
>>>>>>> Stashed changes
  registerForm.addEventListener('submit', () => {
    createUser(registerEmail.value, registerPassword.value)
      .then((userCredential) => {
        // console.log("token "+userCredential["user"]["accessToken"])
        const user = userCredential.user;
<<<<<<< Updated upstream
        saveUserInfo(registerUsername.value, user.email, user.uid);
        alert('usuario registrado correctamente');
=======
        saveUserInfo(user.email, user.email, user.uid);
        // alert('usuario registrado correctamente');

>>>>>>> Stashed changes
        window.location.hash = '#wall';
      })
      .catch((error) => {
        const errorCode = error.code;
<<<<<<< Updated upstream
        console.log(errorCode);
        if (errorCode == 'auth/email-already-in-use') {
          emailInUse.style.display = 'block';
=======
        if(errorCode === "auth/email-already-in-use"){

          emailUSo.style.display = 'block';
          
>>>>>>> Stashed changes
        }
      });
  });
  return registrar;
};
