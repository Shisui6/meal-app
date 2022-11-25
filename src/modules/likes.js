export const likeURL = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${process.env.API_KEY}/likes`;

export const like = async (id) => {
  const data = JSON.stringify({
    item_id: id,
  });

  try {
    await fetch(likeURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    });
  } catch (error) {
    throw new Error(error);
  }
};