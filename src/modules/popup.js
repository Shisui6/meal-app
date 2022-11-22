import '../style/popup.css';
import theMealAPI from '../API/theMealAPI.js';

const body = document.querySelector('body');
const Meal = {
  strArea: 'Japanese',
  strCategory: 'Chicken',
  strIngredients: ['soy sauce', 'water', 'brown sugar', 'ground ginger', 'minced garlic', 'cornstarch', 'chicken breasts', 'stir-fry vegetables', 'brown rice'],
  strMeasure: ['3/4 cup', '1/2 cup', '1/4 cup', '1/2 teaspoon', '1/2 teaspoon', '4 Tablespoons', '2', '1 (12 oz.)', '3 cups'],
  strInstructions: 'Preheat oven to 350° F. Spray a 9x13-inch baking pan with non-stick spray. Combine soy sauce, ½ cup water, brown sugar, ginger and garlic in a small saucepan and cover. Bring to a boil over medium heat. Remove lid and cook for one minute once boiling. Meanwhile, stir together the corn starch and 2 tablespoons of water in a separate dish until smooth. Once sauce is boiling, add mixture to the saucepan and stir to combine. Cook until the sauce starts to thicken then remove from heat. Place the chicken breasts in the prepared pan. Pour one cup of the sauce over top of chicken. Place chicken in oven and bake 35 minutes or until cooked through. Remove from oven and shred chicken in the dish using two forks. *Meanwhile, steam or cook the vegetables according to package directions. Add the cooked vegetables and rice to the casserole dish with the chicken. Add most of the remaining sauce, reserving a bit to drizzle over the top when serving. Gently toss everything together in the casserole dish until combined. Return to oven and cook 15 minutes. Remove from oven and let stand 5 minutes before serving. Drizzle each serving with remaining sauce. Enjoy!',
  strMeal: 'Teriyaki Chicken Casserole',
  strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
  strYoutube: 'https://www.youtube.com/watch?v=4aZr5hZXP_s',
};

export default class Popup {
  mainDiv = document.createElement('div');

  constructor() {
    this.mainDiv.id = 'popup';
  }

  creatPoput(id) {
    theMealAPI(id).then((data) => data.json()).then((data) => data.meals[0]).then((data) => {
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
    topMain.appendChild(infoContain);
    popupMain.appendChild(topMain);
    const instructions = document.createElement('div');
    instructions.classList.add('instructions');
    instructions.innerHTML = meal.strInstructions;
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

const test = new Popup();
test.creatPoput(52772);