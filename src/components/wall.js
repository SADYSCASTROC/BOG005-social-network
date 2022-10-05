
import { savePost, getPost, onGetPost, deletePost, getPostOne, updatePost,} from "../lib/firebase/firebaseService.js";
export const wall = () => {
  const sectionWall = document.createElement('section');
  sectionWall.className = 'sectionWall';

   sectionWall.innerHTML =`<h1 class="tituloo">este es mi muro</h1>
  <form class="formWall">   
    <input type="text" placeholder="Description" id="post">
    <button type="submit" id="btnPost">Post</button>
  </form>
  <div id="createPost"></div>
  `
  

  const formPost = sectionWall.querySelector('.formWall');
  const descriptionPost = sectionWall.querySelector('#post');
  const postContainer = sectionWall.querySelector('#createPost');
  let editStatus = false;
  let id = '';

  formPost.addEventListener('submit', (e) => {
    e.preventDefault();

    if(!editStatus){
      savePost(descriptionPost.value);
    }else{
      updatePost(id,{
        description: descriptionPost.value,
      });
      editStatus=false;
    }
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
       <button class="editButton"  data-id="${doc.id}">Edit</button>
      `;
    });
    postContainer.innerHTML = html;

    const buttonDelete = postContainer.querySelectorAll('.deleteButton')
    buttonDelete.forEach(btn => {
      btn.addEventListener('click', ({target: {dataset}}) => {
        deletePost(dataset.id);
      });
    });

    const buttonEdit = postContainer.querySelectorAll('.editButton');

    buttonEdit.forEach(btn => {
      btn.addEventListener('click',async (e) => {
       const doc= await getPostOne(e.target.dataset.id);
       const postOne = doc.data();
       formPost ['post'].value= postOne.description;
       editStatus = true;
       id = e.target.dataset.id;
       formPost['btnPost'].innerText= 'Update'
      })
    })

   });
  });

  return sectionWall;
};
