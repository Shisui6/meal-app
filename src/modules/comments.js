import autoAnimate from '@formkit/auto-animate';
import { addComments, getComments } from './theMealAPI.js';
import profileImg from '../images/profile.png';
import profile2Img from '../images/profile2.png';
import profile3Img from '../images/profile3.png';
import profile4Img from '../images/profile4.png';
import profile5Img from '../images/profile5.png';
import profile6Img from '../images/profile6.png';

const body = document.querySelector('body');
const sidebar = document.createElement('div');
sidebar.id = 'commets-sidbar';

// Array of profile images
const imageArr = [profileImg, profile2Img, profile3Img, profile4Img, profile5Img, profile6Img];

// create one comment in the sidebar
export const displayComment = (comment) => {
  const card = document.createElement('div');
  card.classList.add('card');

  // a div to contain the image and the name so they can be in the same line
  const textContainer = document.createElement('div');
  textContainer.classList.add('text-container');

  const photo = document.createElement('img');
  photo.src = imageArr[Math.floor(Math.random() * 6)];
  photo.className = 'comment-img';
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

const comentsSize = (array) => array.length;

// creat all comments by using list of object from the api
export const displayComments = (comments, id) => {
  sidebar.innerHTML = '';
  // check if it's null if not create all the comments an show it, if it is just show
  if (comments) {
    const container = document.createElement('div');
    autoAnimate(container);
    container.classList.add('container');
    sidebar.classList.add('close');

    const header = document.createElement('div');
    header.classList.add('header');
    const sction = document.createElement('span');
    sction.classList.add('sction-name');
    sction.textContent = `Comments(${comentsSize(comments)})`;
    header.appendChild(sction);
    const close = document.createElement('span');
    close.textContent = 'X';
    close.classList.add('close');
    close.addEventListener('click', () => sidebar.classList.add('close'));
    header.appendChild(close);
    sidebar.appendChild(header);
    const length = comentsSize(comments);
    for (let i = 0; i < length; i += 1) {
      container.appendChild(displayComment(comments[i]));
    }
    const formContainer = document.createElement('div');
    formContainer.classList.add('formContainer');
    const form = document.createElement('form');
    const inputName = document.createElement('input');
    inputName.classList.add('name');
    inputName.type = 'text';
    inputName.placeholder = 'Your name';
    inputName.setAttribute('required', 'true');
    form.appendChild(inputName);
    const inputcomment = document.createElement('textarea');
    inputcomment.classList.add('comment');
    inputcomment.placeholder = 'Your comment';
    inputcomment.setAttribute('required', 'true');
    form.appendChild(inputcomment);
    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.innerHTML = '<i class="bi bi-send-fill"></i>';
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
  }
  sidebar.classList.remove('close');
};

// use this to make the comments shown by givin the id of the meal
export const showComments = (id) => {
  getComments(id)
    .then((data) => {
      displayComments(data, id);
    })
    .catch(() => displayComments(null));
};
