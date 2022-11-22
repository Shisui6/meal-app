const getById = async (id) => fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

export default getById;