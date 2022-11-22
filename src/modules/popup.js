import '../style/popup.css';

const body = document.querySelector('body');
const popup = document.createElement('div');
popup.id = 'popup';
popup.innerHTML = `

<div class="container">
  <div class="popup-header">
    <button class="close">X</button>
  </div>
  <div class="popup-main">
    <div class="top-main">
      <a href="https://www.youtube.com/watch?v=4aZr5hZXP_s">
        <img src="https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg" alt="">
      </a>
      <div>
        <h2>Teriyaki Chicken Casserole</h2>
        <ul>
          <li><span class="ingredient">soy sauce</span> == <span class="measure">3/4 cup</span></li>
          <li><span class="ingredient">water</span> == <span class="measure">1/2 cup</span></li>
          <li><span class="ingredient">brown sugar</span> == <span class="measure">1/4 cup</span></li>
          <li><span class="ingredient">ground ginger</span> == <span class="measure">1/2 teaspoon</span></li>
          <li><span class="ingredient">minced garlic</span> == <span class="measure">1/2 teaspoon</span></li>
          <li><span class="ingredient">cornstarch</span> == <span class="measure">4 Tablespoons</span></li>
          <li><span class="ingredient">chicken breasts</span> == <span class="measure">2</span></li>
          <li><span class="ingredient">stir-fry vegetables</span> == <span class="measure">1 (12 oz.)</span></li>
          <li><span class="ingredient">brown rice</span> == <span class="measure">3 cups</span></li>
        </ul>
      </div>
    </div>
    <div class="instructions">Preheat oven to 350° F. Spray a 9x13-inch baking pan with non-stick spray. Combine soy sauce, ½ cup water, brown sugar, ginger and garlic in a small saucepan and cover. Bring to a boil over medium heat. Remove lid and cook for one minute once boiling. Meanwhile, stir together the corn starch and 2 tablespoons of water in a separate dish until smooth. Once sauce is boiling, add mixture to the saucepan and stir to combine. Cook until the sauce starts to thicken then remove from heat. Place the chicken breasts in the prepared pan. Pour one cup of the sauce over top of chicken. Place chicken in oven and bake 35 minutes or until cooked through. Remove from oven and shred chicken in the dish using two forks. *Meanwhile, steam or cook the vegetables according to package directions. Add the cooked vegetables and rice to the casserole dish with the chicken. Add most of the remaining sauce, reserving a bit to drizzle over the top when serving. Gently toss everything together in the casserole dish until combined. Return to oven and cook 15 minutes. Remove from oven and let stand 5 minutes before serving. Drizzle each serving with remaining sauce. Enjoy!</div>
  </div>
  <div class="popup-footer">
    <ul>
      <li class="area">Japanese</li>
      <li class="category">Chicken</li>
    </ul>
  </div>
</div>
`;
body.appendChild(popup);
