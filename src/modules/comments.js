import { addComments, getComments } from '../API/theMealAPI.js';
import image from '../images/profile.png';
import counter from './commentsCounter.js';

const body = document.querySelector('body');
const sidebar = document.createElement('div');
sidebar.id = 'commets-sidbar';

// create one comment in the sidebar
const displayComment = (comment) => {
  const card = document.createElement('div');
  card.classList.add('card');

  // a div to contain the image and the name so they can be in the same line
  const textContainer = document.createElement('div');
  textContainer.classList.add('text-container');

  const photo = document.createElement('img');
  photo.src = image;
  card.appendChild(photo);

  const name = document.createElement('h3');
  name.innerHTML = comment.username;
  textContainer.appendChild(name);

  const message = document.createElement('p');
  message.textContent = comment.comment;
  textContainer.appendChild(message);
  card.appendChild(textContainer);
  return card;
};

// creat all comments by using list of object from the api
const displayComments = async (comments, id) => {
  sidebar.innerHTML = '';
  // check if it's null if not create all the comments an show it, if it is just show
  if (comments) {
    const container = document.createElement('div');
    container.classList.add('container');
    sidebar.classList.add('close');

    const header = document.createElement('div');
    header.classList.add('header');
    const sction = document.createElement('span');
    sction.classList.add('sction-name');
    sction.textContent = `Comments(${0})`;
    header.appendChild(sction);
    const close = document.createElement('span');
    close.textContent = 'X';
    close.classList.add('close');
    close.addEventListener('click', () => sidebar.classList.add('close'));
    header.appendChild(close);
    sidebar.appendChild(header);
    const { length } = comments;
    for (let i = 0; i < length; i += 1) {
      container.appendChild(displayComment(comments[i]));
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
    submit.innerHTML = '<i class="bi bi-arrow-return-left"></i>';
    form.appendChild(submit);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (inputName.value.trim() !== '' && inputcomment.value.trim() !== '') {
        const newComment = {
          item_id: id,
          username: inputName.value,
          comment: inputcomment.value,
        };
        inputName.value = '';
        inputcomment.value = '';
        addComments(newComment)
          .then(() => getComments(id)
            .then((data) => displayComments(data, id))
            .catch(() => displayComments(null)));
      }
    });

    formContainer.appendChild(form);
    sidebar.appendChild(container);
    sidebar.appendChild(formContainer);
    body.appendChild(sidebar);
    sction.textContent = `Comments(${counter()})`;
  }
  sidebar.classList.remove('close');
};

// use this to make the comments shown by givin the id of the meal
const showComments = (id) => {
  getComments(id)
    .then((data) => {
      displayComments(data, id);
    })
    .catch(() => displayComments(null));
};

// eslint-disable-next-line import/prefer-default-export
export { showComments };