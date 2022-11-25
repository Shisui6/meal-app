// Imports
import './style.css';
import './modules/popup.js';
import './style/comments.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logoImg from './images/logo.png';
import profileImg from './images/profile.png';
import emptyImg from './images/empty.png';
import { fetchCategories, fetchMealsByCategory, search } from './modules/meals.js';
import './modules/comments.js';

// Get relevant elements from the DOM
const loaderMain = document.getElementById('skeleton-loader-main');
const loaderSide = document.getElementById('skeleton-loader-side');
const logo = document.getElementById('logo');
const empty = document.getElementById('empty-img');
const profile = document.getElementById('profile');
const submitBtn = document.getElementById('submit-btn');

// Set the source for local images
logo.src = logoImg;
profile.src = profileImg;
empty.src = emptyImg;

// On page load, show loading screens and call functions to fetch info from meal api
loaderMain.classList.toggle('hide');
loaderSide.classList.toggle('hide');
fetchCategories();
fetchMealsByCategory('Pasta');

// Add event listener to form to call search function when submitted
document.getElementById('search-form').addEventListener('submit', (e) => {
  e.preventDefault();
  submitBtn.setAttribute('disabled', 'disabled');
  loaderMain.classList.toggle('hide');
  search(document.getElementById('search-term').value);
  setTimeout(() => {
    submitBtn.removeAttribute('disabled');
  }, 2000);
});
