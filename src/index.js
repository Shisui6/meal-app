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
const main = document.getElementById('main');

const fetchMealsByCategory = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Pasta');
    if (response.ok) {
      const json = await response.json();
      json.meals.splice(1, 1);
      json.meals.forEach((item) => {
        const mealElem = document.createElement('div');
        mealElem.className = 'meal';
        mealElem.innerHTML = `
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
        `;
        main.appendChild(mealElem);
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};

fetchMealsByCategory();