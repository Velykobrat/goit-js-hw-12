import { fetchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';

const searchForm = document.getElementById('search-form');
const loader = document.getElementById('loader'); // Отримання елемента спінера

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const searchInput = document.getElementById('search-input');
  const searchQuery = searchInput.value.trim();

  if (!searchQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query!',
    });
    return;
  }

  // Показати спінер перед відправкою запиту
  loader.classList.remove('hidden');

  try {
    const images = await fetchImages(searchQuery);
    renderImages(images);
  } catch (error) {
    console.error('Error searching for images:', error);
  } finally {
    // Сховати спінер після завершення запиту
    loader.classList.add('hidden');
  }
});