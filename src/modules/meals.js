// Imports
import autoAnimate from '@formkit/auto-animate';
import Popup from './popup.js';
import { showComments } from './comments.js';
import { likeURL, like } from './likes.js';
import itemsCounter from './itemsCounter.js';

// Get relevant elements from the DOM
const meals = document.getElementById('meals-id');
const sidebar = document.getElementById('sidebar-id');
const loaderMain = document.getElementById('skeleton-loader-main');
const loaderSide = document.getElementById('skeleton-loader-side');

// Animation library
const controller = autoAnimate(meals);
autoAnimate(sidebar);

// local array of meal ids which the user has liked
const likes = [];

// Function to create meal element and append to DOM
const appendElements = (info, response) => {
  const mealElem = document.createElement('div');
  mealElem.className = 'meal';
  mealElem.insertAdjacentHTML('beforeend', `
  <div class="meal-img-cont">
    <img src="${info.strMealThumb}" alt="meal">
  </div>
  <h3>${info.strMeal}</h3>
  <div class="meal-info">
    <div class="comments">
      <i class="bi bi-chat-fill" id="comment-${info.idMeal}"></i>
    </div>
    <div class="likes">
      <div class="like-button">
        <div class="heart-bg heart-bg-hover">
          <div class="heart-icon" id="like-${info.idMeal}"></div>
        </div>
        <div class="likes-amount" id="like-amount-${info.idMeal}">${response.find((x) => x.item_id === info.idMeal) ? response.find((x) => x.item_id === info.idMeal).likes : '0'}</div>
      </div>
    </div>
  </div>
`);
  mealElem.firstElementChild.id = `meal-${info.idMeal}`;
  meals.appendChild(mealElem);

  if (localStorage.getItem('likes')) {
    if (JSON.parse(localStorage.getItem('likes')).includes(info.idMeal)) {
      document.getElementById(`like-${info.idMeal}`).classList.toggle('liked');
      document.getElementById(`like-${info.idMeal}`).parentNode.classList.toggle('heart-bg-hover');
      document.getElementById(`like-amount-${info.idMeal}`).style.color = '#f91880';
      document.getElementById(`like-amount-${info.idMeal}`).textContent = response.find((x) => x.item_id === info.idMeal).likes;
    }
  }

  document.getElementById(`meal-${info.idMeal}`).addEventListener('click', (e) => {
    if (!e.detail || e.detail === 1) {
      const popup = new Popup();
      popup.createPopup(info.idMeal);
    }
  });

  document.getElementById(`comment-${info.idMeal}`).addEventListener('click', (e) => {
    if (!e.detail || e.detail === 1) {
      showComments(info.idMeal);
    }
  });

  document.getElementById(`like-${info.idMeal}`).addEventListener('click', (e) => {
    if (!e.target.classList.contains('liked')) {
      like(info.idMeal);
      e.target.classList.toggle('liked');
      e.target.parentNode.classList.toggle('heart-bg-hover');
      document.getElementById(`like-amount-${info.idMeal}`).style.color = '#f91880';
      document.getElementById(`like-amount-${info.idMeal}`).textContent = response.find((x) => x.item_id === info.idMeal) ? response.find((x) => x.item_id === info.idMeal).likes += 1 : 1;
      likes.push(info.idMeal);
      localStorage.setItem('likes', JSON.stringify(likes));
    }
  });
};

// Function to modify page styling
const modifyPage = () => {
  const amounts = document.getElementsByClassName('cat-amount');
  for (let i = 0; i < amounts.length; i += 1) {
    amounts[i].textContent = '';
  }

  if (!document.getElementById('empty-id').classList.contains('hide')) {
    document.getElementById('empty-id').classList.toggle('hide');
  }
};

// Function to fetch all meals from a category and append to DOM
export const search = async (term) => {
  modifyPage();
  const cats = document.querySelectorAll('#sidebar-id div');
  for (let i = 0; i < cats.length; i += 1) {
    cats[i].classList.remove('selected');
  }

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    const response1 = await fetch(likeURL);
    if (response.ok && response1.ok) {
      const json = await response.json();
      const json1 = await response1.json();
      loaderMain.classList.toggle('hide');
      meals.innerHTML = '';
      if (json.meals) {
        appendElements(json.meals[0], json1);
      } else {
        document.getElementById('empty-id').classList.toggle('hide');
        document.getElementById('empty-term').textContent = `${term}`;
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

// Function to fetch all meals from a category and append to DOM
export const fetchMealsByCategory = async (cat) => {
  modifyPage();

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
    const response1 = await fetch(likeURL);
    if (response.ok && response1.ok) {
      const json = await response.json();
      const json1 = await response1.json();
      loaderMain.classList.toggle('hide');
      controller.enable();
      json.meals.forEach((item) => {
        appendElements(item, json1);
      });
      document.getElementById(`${cat}-amount`).textContent = `(${itemsCounter()})`;
    }
  } catch (error) {
    throw new Error(error);
  }
};

// Function to fetch meal categories and append to DOM
export const fetchCategories = async () => {
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
        <p>${item.strCategory}<span id="${item.strCategory}-amount" class="cat-amount"></span></p>
      `);
        sidebar.appendChild(categoryElem);

        document.getElementById(`category-${item.strCategory}`).addEventListener('click', (e) => {
          if (!e.detail || e.detail === 1) {
            loaderMain.classList.toggle('hide');
            controller.disable();
            meals.innerHTML = '';
            const cats = document.querySelectorAll('#sidebar-id div');
            for (let i = 0; i < cats.length; i += 1) {
              cats[i].classList.remove('selected');
            }
            categoryElem.classList.add('selected');
            fetchMealsByCategory(item.strCategory);
          }
        });
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};
