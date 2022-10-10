import {
  savePost, onGetPost, deletePost, getPostOne, updatePost, logOut, currentUser, auth, likePost, DeletelikePost,
} from '../lib/firebase/firebaseService.js';

 HEAD
import { savePost, getPost, onGetPost, deletePost, getPostOne, updatePost, } from "../lib/firebase/firebaseService.js";
export const wall = () => {
	const sectionWall = document.createElement('section');
	sectionWall.className = 'sectionWall';
          sectionWall.innerHTML = `
	<header class=headerWall>
	   <img class="imgLogoWall" src="IMG/Explore-removebg-preview.png">
          </header>
	<section>
		<form class="formWall">
			<input type="text" placeholder="Description" id="post">
			<button type="submit" id="btnPost">Post</button>
		</form>
		<div id="createPost"></div>
	</section>
  `

	const formPost = sectionWall.querySelector('.formWall');
	const descriptionPost = sectionWall.querySelector('#post');
	const postContainer = sectionWall.querySelector('#createPost');
	let editStatus = false;
	let id = '';

 const wall = () => {
  const sectionWall = document.createElement('section');
  sectionWall.className = 'sectionWall';
  sectionWall.innerHTML = `<h1 class="tituloo">este es mi muro</h1>
  <button class="wallLogout">salir</button>
  <form class="formWall">   
    <input type="text" placeholder="Description" id="post">

    <button type="submit" id="btnPost">Post</button>
  </form>
  <div id="createPost"></div>
  `;

  const formPost = sectionWall.querySelector('.formWall');
  const descriptionPost = sectionWall.querySelector('#post');
  const postContainer = sectionWall.querySelector('#createPost');
  const logOutButton = sectionWall.querySelector('.wallLogout');

  let editStatus = false;
  let id = '';
  const like = [];


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

			let html = ''
			querySnapshot.forEach(doc => {
				const post = doc.data();
				html += `
                                               <div>
                                                    <p> ${post.description}</p>
                                               </div>
				       <section clas="wallButtons">
				            <a href="#" class="deleteButton" data-id="${doc.id}"><span class= icon-cross></span>Delete</a>
                                                    <button class="editButton"  data-id="${doc.id}">Edit</button>
				       </section>
                                        `;
			});
			postContainer.innerHTML = html;

			const buttonDelete = postContainer.querySelectorAll('.deleteButton')
			buttonDelete.forEach(btn => {
				btn.addEventListener('click', ({ target: { dataset } }) => {
					deletePost(dataset.id);
				});
			});

			const buttonEdit = postContainer.querySelectorAll('.editButton');

			buttonEdit.forEach(btn => {
				btn.addEventListener('click', async (e) => {
					const doc = await getPostOne(e.target.dataset.id);
					const postOne = doc.data();
					formPost['post'].value = postOne.description;
					editStatus = true;
					id = e.target.dataset.id;
					formPost['btnPost'].innerText = 'Update'
				})
			})

		});
	});

    if (!editStatus) {
      savePost(descriptionPost.value, like);
    } else {
      updatePost(id, {
        description: descriptionPost.value,
      });
      editStatus = false;
    }
    formPost.reset();
  };

  window.addEventListener('DOMContentLoaded', async () => {
    onGetPost((querySnapshot) => {
      let html = '';
      querySnapshot.forEach((doc) => {
        const post = doc.data();
        html += `
       <div>
       <p> ${post.email}</p>

        <p> ${post.description}</p>
       </div>
       <button class="likeButton"  data-id="${doc.id}">like</button>
       <button class="deleteButton"  data-id="${doc.id}">Delete</button>
       <button class="editButton"  data-id="${doc.id}">Edit</button>
      `;
      });
      postContainer.innerHTML = html;

      const buttonDelete = postContainer.querySelectorAll('.deleteButton');
      buttonDelete.forEach((btn) => {
        btn.addEventListener('click', ({ target: { dataset } }) => {
          deletePost(dataset.id);
        });
      });
      /* likes */
      const buttonLike = postContainer.querySelectorAll('.likeButton');
      buttonLike.forEach((btn) => {
        btn.addEventListener('click', (event) => {
          const currentUserLike = auth.currentUser.uid;
          console.log(currentUserLike);
          const idLikeButton = event.target.dataset.id;
          console.log(idLikeButton);
            likePost(currentUserLike, idLikeButton);
          //  deletePost(currentUserLike, idLikeButton);
        });
      });

      const buttonEdit = postContainer.querySelectorAll('.editButton');

      buttonEdit.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const doc = await getPostOne(e.target.dataset.id);
          const postOne = doc.data();
          formPost.post.value = postOne.description;
          editStatus = true;
          id = e.target.dataset.id;
          formPost.btnPost.innerText = 'Update';
        });
      });
    });
  });



	return sectionWall;

  logOutButton.addEventListener('click', () => {
    logOut();
    window.location.hash = '';
    location.reload();
  });

  return sectionWall;
};
