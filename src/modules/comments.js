import { getComments } from '../API/theMealAPI.js';
import '../style/comments.css';
import profileImg from '../images/profile.png';

const body = document.querySelector('body');

const sidebar = document.createElement('div');
sidebar.id = 'commets-sidbar';

const displayComment = (comment) => {
  const card = document.createElement('div');
  card.classList.add('card');

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

const displayComments = (comments) => {
  sidebar.innerHTML = '';
  if (comments) {
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
    body.appendChild(sidebar);
  }
  sidebar.classList.remove('close');
};

const showComments = (id) => {
  getComments(id).then((data) => displayComments(data)).catch(() => displayComments(null));
};
showComments('item1');