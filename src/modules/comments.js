import { addComments, getComments } from '../API/theMealAPI.js';
import '../style/comments.css';
import profileImg from '../images/profile.png';

const body = document.querySelector('body');
const sidebar = document.createElement('div');
sidebar.id = 'commets-sidbar';

// create one comment in the sidebar
export const displayComment = (comment) => {
  const card = document.createElement('div');
  card.classList.add('card');

  // a div to contain the image and the name so they can be in the same line
  const info = document.createElement('div');
  info.classList.add('info');

  const photo = document.createElement('img');
  photo.src = profileImg;
  info.appendChild(photo);

  const name = document.createElement('h3');
  name.innerHTML = comment.username;
  info.appendChild(name);
  card.appendChild(info);

  const message = document.createElement('p');
  message.textContent = comment.comment;
  card.appendChild(message);
  return card;
};

// creat all comments by using list of object from the api
export const displayComments = (comments, id) => {
  sidebar.innerHTML = '';
  // check if it's null if not create all the comments an show it, if it is just show
  if (comments) {
    const container = document.createElement('div');
    // container.
    sidebar.classList.add('close');
    const close = document.createElement('span');
    close.textContent = 'X';
    close.classList.add('close');
    close.addEventListener('click', () => sidebar.classList.add('close'));
    sidebar.appendChild(close);

    const { length } = comments;
    for (let i = 0; i < length; i += 1) {
      sidebar.appendChild(displayComment(comments[i]));
    }
    const formContainer = document.createElement('div');
    formContainer.classList.add('formContainer');
    const form = document.createElement('form');
    const inputName = document.createElement('input');
    inputName.classList.add('name');
    inputName.type = 'text';
    inputName.placeholder = 'name';
    inputName.setAttribute('required', 'true');
    form.appendChild(inputName);
    const inputcomment = document.createElement('textarea');
    inputcomment.classList.add('comment');
    inputcomment.placeholder = 'add you comment...';
    inputcomment.setAttribute('required', 'true');
    form.appendChild(inputcomment);
    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.textContent = 'send';
    form.appendChild(submit);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (inputName.value.trim() !== '' && inputcomment.value.trim() !== '') {
        addComments({
          item_id: id,
          username: inputName.value,
          comment: inputcomment.value,
        });
        inputName.value = '';
        inputcomment.value = '';
        getComments(id)
          .then((data) => displayComments(data, id))
          .catch(() => displayComments(null));
      }
    });

    formContainer.appendChild(form);
    sidebar.appendChild(formContainer);
    body.appendChild(sidebar);
  }
  sidebar.classList.remove('close');
};

// use this to make the comments shown by givin the id of the meal
export const showComments = (id) => {
  getComments(id).then((data) => displayComments(data, id)).catch(() => displayComments(null));
};
showComments('item1');