// Imports
import './style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logoImg from './images/logo.png';
import profileImg from './images/profile.png';

const logo = document.getElementById('logo');
const profile = document.getElementById('profile');

logo.src = logoImg;
profile.src = profileImg;

// Get relevant elements from the DOM
const meals = document.getElementById('meals-id');
const sidebar = document.getElementById('sidebar-id');
const loaderMain = document.getElementById('skeleton-loader-main');
const loaderSide = document.getElementById('skeleton-loader-side');

const fetchMealsByCategory = async (cat) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
    if (response.ok) {
      const json = await response.json();
      loaderMain.classList.toggle('hide');
      json.meals.forEach((item) => {
        const mealElem = document.createElement('div');
        mealElem.className = 'meal';
        mealElem.insertAdjacentHTML('beforeend', `
        <img src="${item.strMealThumb}" alt="meal">
        <h3>${item.strMeal}</h3>
        <div class="meal-info">
          <div class="comments">
            <i class="bi bi-chat"></i>
            <p>50</p>
          </div>
          <div class="likes">
            <i class="bi bi-heart"></i>
            <p>100</p>
          </div>
        </div>
      `);
        meals.appendChild(mealElem);
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};

const fetchCategories = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    if (response.ok) {
      const json = await response.json();
      json.categories.splice(3, 2);
      json.categories.splice(4, 1);
      json.categories.splice(5, 4);
      json.categories.pop();
      loaderSide.classList.toggle('hide');
      json.categories.forEach((item) => {
        const categoryElem = document.createElement('div');
        categoryElem.className = 'cat';
        if (item.strCategory === 'Pasta') {
          categoryElem.classList.add('selected');
        }
        categoryElem.id = `category-${item.strCategory}`;
        categoryElem.insertAdjacentHTML('beforeend', `
        <img src="${item.strCategoryThumb}" alt="meal">
        <p>${item.strCategory}</p>
      `);
        sidebar.appendChild(categoryElem);

        document.getElementById(`category-${item.strCategory}`).addEventListener('click', () => {
          meals.innerHTML = '';
          loaderMain.classList.toggle('hide');
          const cats = document.querySelectorAll('#sidebar-id div');
          for (let i = 0; i < cats.length; i += 1) {
            cats[i].classList.remove('selected');
          }
          categoryElem.classList.add('selected');
          fetchMealsByCategory(item.strCategory);
        });
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};

loaderMain.classList.toggle('hide');
loaderSide.classList.toggle('hide');
fetchCategories();
fetchMealsByCategory('Pasta');