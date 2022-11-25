import itemsCounter from '../modules/itemsCounter.js';

describe('itemsCounter()', () => {
  test('returns the count of the number of items on the homepage', () => {
    document.body.innerHTML = `
        <div id="meals-id">
          <div class="meal"></div>
          <div class="meal"></div>
          <div class="meal"></div>
          <div class="meal"></div>
          <div class="meal"></div>
        </div>
      `;

    const result = 5;

    expect(itemsCounter()).toBe(result);
  });
});