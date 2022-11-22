// Imports
import './style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logoImg from './images/logo.png';
import profileImg from './images/profile.png';
import { fetchCategories, fetchMealsByCategory } from './modules/meals.js';

// Get relevant elements from the DOM
const loaderMain = document.getElementById('skeleton-loader-main');
const loaderSide = document.getElementById('skeleton-loader-side');
const logo = document.getElementById('logo');
const profile = document.getElementById('profile');

// Set the source for local images
logo.src = logoImg;
profile.src = profileImg;

// On page load, show loading screens and call functions to fetch info from meal api
loaderMain.classList.toggle('hide');
loaderSide.classList.toggle('hide');
fetchCategories();
fetchMealsByCategory('Pasta');