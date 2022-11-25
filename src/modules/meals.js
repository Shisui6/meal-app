// Imports
import Popup from './popup.js';
import { showComments } from './comments.js';
import { likeURL, like } from './likes.js';
import itemsCounter from './itemsCounter.js';

// Get relevant elements from the DOM
const meals = document.getElementById('meals-id');
const sidebar = document.getElementById('sidebar-id');
const loaderMain = document.getElementById('skeleton-loader-main');
const loaderSide = document.getElementById('skeleton-loader-side');

const likes = [];

// Function to fetch all meals from a category and append to DOM
export const fetchMealsByCategory = async (cat) => {
  const amounts = document.getElementsByClassName('cat-amount');
  for (let i = 0; i < amounts.length; i += 1) {
    amounts[i].textContent = '';
  }
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
    const response1 = await fetch(likeURL);
    if (response.ok && response1.ok) {
      const json = await response.json();
      const json1 = await response1.json();
      loaderMain.classList.toggle('hide');
      json.meals.forEach((item) => {
        const mealElem = document.createElement('div');
        mealElem.className = 'meal';
        mealElem.insertAdjacentHTML('beforeend', `
        <div class="meal-img-cont">
          <img src="${item.strMealThumb}" alt="meal">
        </div>
        <h3>${item.strMeal}</h3>
        <div class="meal-info">
          <div class="comments">
            <i class="bi bi-chat-fill" id="comment-${item.idMeal}"></i>
          </div>
          <div class="likes">
            <div class="like-button">
              <div class="heart-bg heart-bg-hover">
                <div class="heart-icon" id="like-${item.idMeal}"></div>
              </div>
              <div class="likes-amount" id="like-amount-${item.idMeal}">${json1.find((x) => x.item_id === item.idMeal) ? json1.find((x) => x.item_id === item.idMeal).likes : '0'}</div>
            </div>
          </div>
        </div>
      `);
        mealElem.firstElementChild.id = `meal-${item.idMeal}`;
        meals.appendChild(mealElem);

        if (localStorage.getItem('likes')) {
          if (JSON.parse(localStorage.getItem('likes')).includes(item.idMeal)) {
            document.getElementById(`like-${item.idMeal}`).classList.toggle('liked');
            document.getElementById(`like-${item.idMeal}`).parentNode.classList.toggle('heart-bg-hover');
            document.getElementById(`like-amount-${item.idMeal}`).style.color = '#f91880';
            document.getElementById(`like-amount-${item.idMeal}`).textContent = json1.find((x) => x.item_id === item.idMeal).likes;
          }
        }

        document.getElementById(`meal-${item.idMeal}`).addEventListener('click', () => {
          const popup = new Popup();
          popup.createPopup(item.idMeal);
        });

        document.getElementById(`comment-${item.idMeal}`).addEventListener('click', () => {
          showComments(item.idMeal);
        });

        document.getElementById(`like-${item.idMeal}`).addEventListener('click', (e) => {
          if (!e.target.classList.contains('liked')) {
            like(item.idMeal);
            e.target.classList.toggle('liked');
            e.target.parentNode.classList.toggle('heart-bg-hover');
            document.getElementById(`like-amount-${item.idMeal}`).style.color = '#f91880';
            document.getElementById(`like-amount-${item.idMeal}`).textContent = json1.find((x) => x.item_id === item.idMeal) ? json1.find((x) => x.item_id === item.idMeal).likes += 1 : 1;
            likes.push(item.idMeal);
            localStorage.setItem('likes', JSON.stringify(likes));
          }
        });
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
