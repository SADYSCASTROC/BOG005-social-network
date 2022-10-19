/* eslint-disable no-tabs */
import {
  savePost, onGetPost, deletePost, getPostOne, updatePost, logOut,
  auth, likePost, DeletelikePost,

} from '../lib/firebase/firebaseService.js';

export const wall = () => {
  const sectionWall = document.createElement('section');
  sectionWall.className = 'sectionWall';
  sectionWall.innerHTML = `
         
	<header class="headerWall">
	   <img class="imgLogoWall" src="IMG/explore.PNG">
     <ul>
     <li><button id="modalPost"> <i class="material-icons iconoPost">post_add</i></button></li>
     <li><button class="wallLogout"> <i class="material-icons">logout</i></button></li>
     </ul>
  </header>
  <h1 class="walltitle">Tell your experience</h1> 

	<section>
  <div class="modal">
    <div class="divModal">
    <p class="close">X</p>
		<form class="formWall" >
			<textarea type="text" id="post"></textarea>
			<button type="submit" id="btnPost"><i class="material-icons">save_as</i></button></button>
		</form>
    </div>
  </div>
  <div id="createPost"></div>
	</section>
   
  `;
  const createPost = sectionWall.querySelector('#btnPost');
  const divModal = sectionWall.querySelector('.modal');
  const formPost = sectionWall.querySelector('.formWall');
  const descriptionPost = sectionWall.querySelector('#post');
  const postContainer = sectionWall.querySelector('#createPost');
  const logOutButton = sectionWall.querySelector('.wallLogout');
  let editStatus = false;
  let id = '';

  // eslint-disable-next-line no-unused-expressions
  formPost.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!editStatus) {
      if (descriptionPost.value !== '') {
        savePost(descriptionPost.value);
      }
    } else if (descriptionPost.value !== '') {
      updatePost(id, {
        description: descriptionPost.value,
      });
      editStatus = false;
    }
    formPost.reset();
  });

  window.addEventListener('DOMContentLoaded', async () => {
    onGetPost((querySnapshot) => {
      let htmladd = '';
      // const htmlremove = '';

      let p1 = '';

      querySnapshot.forEach((doc) => {
        const post = doc.data();

        let aux = 0;
        p1 = '';

        // eslint-disable-next-line array-callback-return
        post.like.map((index) => {
          if (index === auth.currentUser.uid) {
            console.log(auth.currentUser.uid);

            aux = 1;
          }
        });

        if (aux === 1) {
          p1 += `<button class="RemovelikeButton buttonsCard"><i data-id="${doc.id}" class='fa fa-heart' style="color: #FDD835 ; font-size:18px"></i></button>`;
        } else {
          p1 += `<button class="likeButton buttonsCard"><i data-id="${doc.id}" class="fa fa-heart-o" style="font-size:15px"></i></button>`;
        }

        htmladd += `
          <div class="card">
          <p class=post> <p class="email"> ${post.email}</p>  <br><br> <P class="description">${post.description}</P> </p>         
          <section class="wallButtons">
                    <p class='likeNumber buttonsCard'>${post.like.length}</p>
                      ${p1}
                    <button class="editButton buttonsCard"> <i  data-id="${doc.id}" class="material-icons">edit</i></button>
                    <button class="deleteButton buttonsCard"><i data-id="${doc.id}" class="material-icons">delete</i></button>
          </section>
          </div>    `;
      });
      postContainer.innerHTML = htmladd;
      // Modal
      const buttonModal = sectionWall.querySelector('#modalPost');
      buttonModal.addEventListener('click', () => {
        divModal.style.opacity = '1';
        divModal.style.visibility = 'visible';
      });

      const pClose = sectionWall.querySelector('.close');
      pClose.addEventListener('click', () => {
        divModal.style.opacity = '0';
        divModal.style.visibility = 'hidden';
      });

      createPost.addEventListener('click', () => {
        if (descriptionPost.value === '') {
          alert('el campo esta vacio');
          return;
        } if (descriptionPost.value !== '') {
          divModal.style.opacity = '0';
          divModal.style.visibility = 'hidden';
        }
      });

      /* likes */
      const buttonLike = postContainer.querySelectorAll('.likeButton');
      buttonLike.forEach((btn) => {
        btn.addEventListener('click', (event) => {
          const currentUserLike = auth.currentUser.uid;
          console.log(currentUserLike);
          const idLikeButton = event.target.dataset.id;
          console.log(idLikeButton);
          console.log('add');

          likePost(currentUserLike, idLikeButton);
        });
      });
      // Eliminar megusta
      const buttonLikeremove = postContainer.querySelectorAll('.RemovelikeButton');
      buttonLikeremove.forEach((btn) => {
        btn.addEventListener('click', (event) => {
          const currentUserLike = auth.currentUser.uid;
          console.log('eliminando');
          const idLikeButton = event.target.dataset.id;
          console.log(idLikeButton);
          DeletelikePost(currentUserLike, idLikeButton);
        });
      });

      // Eliminar
      const buttonDelete = postContainer.querySelectorAll('.deleteButton');
      buttonDelete.forEach((btn) => {
        btn.addEventListener('click', ({ target: { dataset } }) => {
          deletePost(dataset.id);
        });
      });

      // editar
      const buttonEdit = postContainer.querySelectorAll('.editButton');
      buttonEdit.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const doc = await getPostOne(e.target.dataset.id);
          const postOne = doc.data();
          formPost.post.value = postOne.description;
          editStatus = true;
          id = e.target.dataset.id;
          divModal.style.opacity = '1';
          divModal.style.visibility = 'visible';
          // formPost.btnPost.innerText = 'Update';
        });
      });
    });
  });

  // salir
  logOutButton.addEventListener('click', () => {
    logOut();
    window.location.hash = '';
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  });

  return sectionWall;
};
