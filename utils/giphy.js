async function fetchGif(title) {
  try {
    const search = title + " movie";
    const url = `https://api.giphy.com/v1/gifs/translate?api_key=cjGdfLDepHC3ULDf9t46kOHUSAzgEZ51&s=${search}`;
    const response = await fetch(url, { mode: 'cors' });
    if (!response.ok) {
      throw new Error(response.status);
    }
    const gifData = await response.json();
    if (!gifData.data || !gifData.data.images) {
      console.log('GIF not found');
      return null;
    } else {
      return gifData.data.images.original.url;
    }
  } catch (err) {
    console.error('Could not load GIF:', err);
    return null;
  }
}

module.exports = {
    fetchGif,
}