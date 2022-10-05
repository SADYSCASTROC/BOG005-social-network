
import { savePost, getPost, onGetPost, deletePost,} from "../lib/firebase/firebaseService.js";
export const wall = () => {
  const sectionWall = document.createElement('section');
  sectionWall.className = 'sectionWall';

   sectionWall.innerHTML =`<h1 class="tituloo">este es mi muro</h1>
  <form class="formWall">   
    <input type="text" placeholder="Description" id="post">
    <button type="submit">Post</button>
  </form>
  <div id="createPost"></div>
  `
  

  const formPost = sectionWall.querySelector('.formWall');
  const descriptionPost = sectionWall.querySelector('#post');
  const postContainer = sectionWall.querySelector('#createPost');

  formPost.addEventListener('submit', (e) => {
    e.preventDefault();
    savePost(descriptionPost.value);
    formPost.reset();

  });

  window.addEventListener('DOMContentLoaded', async () => {
   onGetPost((querySnapshot)=>{

    let html = ''
    querySnapshot.forEach(doc => {
      const post =doc.data();
      html += `
       <div>
        <p> ${post.description}</p>
       </div>
       <button class="deleteButton"  data-id="${doc.id}">Delete</button>
      `;
    });
    postContainer.innerHTML = html;

    const buttonDelete = postContainer.querySelectorAll('.deleteButton')
    buttonDelete.forEach(btn => {
      btn.addEventListener('click', ({target: {dataset}}) => {
        deletePost(dataset.id);
      })
    })

   });
  });

  return sectionWall;
};
