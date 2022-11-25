const invo = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
const key = 'ZL01BQpf9fh0l4EnAOtP';

// geting a meal by the id of it
const getById = async (id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const result = await response.json();
  return result.meals[0];
};

// geting a comments by the id of the meal
const getComments = async (id) => {
  const response = await fetch(`${invo}${key}/comments?item_id=${id}`);
  const result = await response.json();
  return result;
};

// adding a coments
const addComments = async (newScore) => {
  await fetch(`${invo}${key}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newScore),
  });
};
export { getById, getComments, addComments };