import { getById } from '../API/theMealAPI.js';

const body = document.querySelector('body');

export default class Popup {
  mainDiv = document.createElement('div');

  constructor() {
    this.mainDiv.id = 'popup';
  }

  createPopup(id) {
    getById(id).then((data) => {
      this.generate(data);
    });
  }

  displayPopup(meal) {
    this.mainDiv.innerHTML = '';
    const container = document.createElement('div');
    container.classList.add('container');
    const popupHeader = document.createElement('div');
    popupHeader.classList.add('popup-header');
    const close = document.createElement('button');
    close.addEventListener('click', () => this.close());
    close.classList.add('close');
    close.innerHTML = 'X';
    popupHeader.appendChild(close);
    container.appendChild(popupHeader);

    const popupMain = document.createElement('div');
    popupMain.classList.add('popup-main');
    const topMain = document.createElement('div');
    topMain.classList.add('top-main');
    const youtubeLink = document.createElement('a');
    youtubeLink.href = meal.strYoutube;
    const mealImg = document.createElement('img');
    mealImg.src = meal.strMealThumb;
    youtubeLink.appendChild(mealImg);
    topMain.appendChild(youtubeLink);
    popupMain.appendChild(topMain);
    const instructions = document.createElement('div');
    instructions.classList.add('instructions');
    const infoContain = document.createElement('div');
    const name = document.createElement('h2');
    name.innerHTML = meal.strMeal;
    infoContain.appendChild(name);
    const ingredients = document.createElement('ul');
    for (let i = 0; i < meal.strIngredients.length; i += 1) {
      const li = document.createElement('li');
      li.innerHTML = `<span class="ingredient">${meal.strIngredients[i]}</span> <span class="measure">(${meal.strMeasures[i]})</span>`;
      ingredients.appendChild(li);
    }
    infoContain.appendChild(ingredients);
    instructions.appendChild(infoContain);
    const directions = document.createElement('p');
    directions.textContent = meal.strInstructions;
    instructions.appendChild(directions);
    popupMain.appendChild(instructions);
    container.appendChild(popupMain);

    this.mainDiv.appendChild(container);
    body.appendChild(this.mainDiv);
  }

  close() {
    body.removeChild(this.mainDiv);
  }

  generate(meal) {
    const result = {};
    const strIngredients = [];
    const strMeasures = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const property in meal) {
      if (meal[property] !== '' && meal[property] != null) {
        result[property] = meal[property];
      }
    }
    for (let i = 1; i <= 20; i += 1) {
      if (meal[`strIngredient${i}`] !== '') {
        strIngredients.push(meal[`strIngredient${i}`]);
        strMeasures.push(meal[`strMeasure${i}`]);
      }
    }
    result.strIngredients = strIngredients;
    result.strMeasures = strMeasures;
    this.displayPopup(result);
  }
}
