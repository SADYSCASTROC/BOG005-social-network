/* eslint-disable array-callback-return */
/* eslint-disable no-tabs */
import {
  savePost, onGetPost, deletePost, getPostOne, updatePost, logOut, auth, likePost, DeletelikePost,
} from '../lib/firebase/firebaseService.js';

export const wall = () => {
  const sectionWall = document.createElement('section');
  sectionWall.className = 'sectionWall';
  sectionWall.innerHTML = `
	<header class=headerWall>
	   <img class="imgLogoWall" src="IMG/Explore-removebg-preview.png">
  </header>
  <button class="wallLogout">salir</button>
	<section>
		<form class="formWall">
			<input type="text" placeholder="Description" id="post">
			<button type="submit" id="btnPost">Post</button>
		</form>
		<texarea id="createPost"></texarea>
	</section>
  `;

  const formPost = sectionWall.querySelector('.formWall');
  const descriptionPost = sectionWall.querySelector('#post');
  const postContainer = sectionWall.querySelector('#createPost');
  const logOutButton = sectionWall.querySelector('.wallLogout');
  let editStatus = false;
  let id = '';

  formPost.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!editStatus) {
      savePost(descriptionPost.value);
    } else {
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
      
        post.like.map((index) => {
          if (index === auth.currentUser.uid) {
            aux = 1;
            console.log('me encontraron');
          }
        });

        if (aux === 1) {
          p1 += `<button class="RemovelikeButton"  data-id="${doc.id}">ya no me gusta</button>`;
        } else {
          p1 += `<button class="likeButton"  data-id="${doc.id}">me gusta</button>`;
        }

        htmladd += `
          <div>
          <p>  ${post.email} <br> <br> ${post.description}</p>
          <p> ${post.like.length}</p>

          <section clas="wallButtons">
                    ${p1}
                    <button class="deleteButton"  data-id="${doc.id}">Delete</button>
                    <button class="editButton"  data-id="${doc.id}">Edit</button>
				    </section>
          </div>
				       
             `;
      });
      postContainer.innerHTML = htmladd;
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
          // formPost.btnPost.innerText = 'Update';
        });
      });
    });
  });

 // salir
  logOutButton.addEventListener('click', () => {
    logOut();
    window.location.hash = '';
    location.reload();
  });

  return sectionWall;
};
