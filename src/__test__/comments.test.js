import counter from '../modules/commentsCounter.js';

describe('count how much cards(comments) inside the container ', () => {
  test('testing the length of 2 cards inside the container', () => {
    document.body.innerHTML = `
    <div class="container">
      <div class="card">
        <img src="http://localhost:8080/5faf09a7795d28bf5a2b.png">
        <div class="text-container">
          <h3>Ghost</h3>
          <p>My favorite</p>
        </div>
      </div>
      <div class="card">
        <img src="http://localhost:8080/5faf09a7795d28bf5a2b.png">
        <div class="text-container">
          <h3>Test</h3>
          <p>Hey</p>
        </div>
      </div>
    </div>
    `;
    expect(counter()).toBe(2);
  });
  test('testing a empty container', () => {
    document.body.innerHTML = '<div class="container"></div>';
    expect(counter()).toBe(0);
  });
  test('testing unexisting container', () => {
    document.body.innerHTML = '';
    expect(counter()).toBe(0);
  });
});