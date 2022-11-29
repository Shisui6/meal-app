import autoAnimate from '@formkit/auto-animate';
import moment from 'moment/moment.js';
import { addComments, getComments } from './theMealAPI.js';
import profileImg from '../images/profile.png';
import profile2Img from '../images/profile2.png';
import profile3Img from '../images/profile3.png';
import profile4Img from '../images/profile4.png';
import profile5Img from '../images/profile5.png';
import profile6Img from '../images/profile6.png';
import emptyComment from '../images/comment.png';
import counter from './commentsCounter.js';

const body = document.querySelector('body');
const sidebar = document.createElement('div');
sidebar.id = 'commets-sidbar';

// Array of profile images
const imageArr = [profileImg, profile2Img, profile3Img, profile4Img, profile5Img, profile6Img];

// create one comment in the sidebar
const displayComment = (comment) => {
  const card = document.createElement('div');
  card.classList.add('card');

  // a div to contain the image and the name so they can be in the same line
  const textContainer = document.createElement('div');
  textContainer.classList.add('text-container');

  const photo = document.createElement('img');
  photo.src = imageArr[Math.floor(Math.random() * 6)];
  photo.className = 'comment-img';
  card.appendChild(photo);

  const textContHead = document.createElement('div');
  textContHead.classList.add('text-cont-head');

  const name = document.createElement('h3');
  name.innerHTML = comment.username;
  textContHead.appendChild(name);

  const time = document.createElement('p');
  const date = comment.creation_date;
  date.replace('-', '');
  date.replace('-', '');
  time.innerHTML = moment(date, 'YYYYMMDD').fromNow();
  textContHead.appendChild(time);

  const message = document.createElement('p');
  message.textContent = comment.comment;
  textContainer.appendChild(textContHead);
  textContainer.appendChild(message);
  card.appendChild(textContainer);
  return card;
};

// creat all comments by using list of object from the api
const displayComments = async (comments, id) => {
  sidebar.innerHTML = '';
  // check if it's null if not create all the comments an show it, if it is just show
  if (comments.length) {
    const container = document.createElement('div');
    autoAnimate(container);
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
    sction.textContent = `Comments(${counter()})`;
  } else {
    const container = document.createElement('div');
    autoAnimate(container);
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

    const empty = document.createElement('div');
    empty.classList.add('empty-comment');

    const commentImg = document.createElement('img');
    commentImg.src = emptyComment;
    empty.appendChild(commentImg);

    const commentText = document.createElement('p');
    commentText.innerHTML = 'No comments yet. <br> Add a new comment to see it here';
    empty.appendChild(commentText);

    container.appendChild(empty);

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
const showComments = (id) => {
  getComments(id)
    .then((data) => {
      displayComments(data, id);
    })
    .catch(() => displayComments(null));
};

// eslint-disable-next-line import/prefer-default-export
export { showComments };