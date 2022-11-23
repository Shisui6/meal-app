const invo = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
const mealSearch = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const key = 'ZL01BQpf9fh0l4EnAOtP';

const getById = async (id) => {
  const response = await fetch(`${mealSearch}${id}`);
  const result = await response.json();
  return result;
};

const getComments = async (id) => {
  const response = await fetch(`${invo}${key}/comments?item_id=${id}`);
  const result = await response.json();
  return result;
};

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