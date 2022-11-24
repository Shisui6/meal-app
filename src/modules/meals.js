// Imports
import Popup from './popup.js';

// Get relevant elements from the DOM
const meals = document.getElementById('meals-id');
const sidebar = document.getElementById('sidebar-id');
const loaderMain = document.getElementById('skeleton-loader-main');
const loaderSide = document.getElementById('skeleton-loader-side');

// Function to fetch all meals from a category and append to DOM
export const fetchMealsByCategory = async (cat) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
    const response1 = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/ZL01BQpf9fh0l4EnAOtP/likes');
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
            <i class="bi bi-chat"></i>
            <p>50</p>
          </div>
          <div class="likes">
            <i class="bi bi-heart"></i>
            <p>${json1.find((x) => x.item_id === item.idMeal) ? json1.find((x) => x.item_id === item.idMeal).item_id : '0'}</p>
          </div>
        </div>
      `);
        mealElem.firstElementChild.id = `meal-${item.idMeal}`;
        meals.appendChild(mealElem);

        document.getElementById(`meal-${item.idMeal}`).addEventListener('click', () => {
          const popup = new Popup();
          popup.createPopup(item.idMeal);
        });
      });
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
