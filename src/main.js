import { fetchImages } from './js/pixabay-api.js';
import { renderImages, hideLoadMoreButton, showEndMessage } from './js/render-functions.js';

const searchForm = document.getElementById('search-form');
const loader = document.getElementById('loader');
const loadMoreBtn = document.getElementById('load-more-btn');
const endMessage = document.getElementById('end-message');
let currentSearchQuery = '';
let currentPage = 1;

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

  currentSearchQuery = searchQuery;
  currentPage = 1;

  loader.classList.remove('hidden');
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  try {
    const images = await fetchImages(searchQuery);
    const totalHits = images.totalHits;
    renderImages(images, totalHits);

    // Показуємо кнопку "Load more" після завантаження зображень
    loadMoreBtn.style.display = 'block';  
    if (totalHits <= 14) {
      hideLoadMoreButton();
      showEndMessage();
    }

  } catch (error) {
    console.error('Error searching for images:', error);
  } finally {
    loader.classList.add('hidden');
  }
});

// Функція для плавного прокручування сторінки до нижнього краю останнього завантаженого зображення
function smoothScrollByCardHeight() {
  const gallery = document.getElementById('gallery');
  const lastImage = gallery.lastElementChild;
  const lastImageHeight = lastImage.offsetHeight;
  const lastImageOffset = lastImage.offsetTop;

  window.scrollTo({
    top: lastImageOffset + lastImageHeight,
    behavior: 'smooth'
  });
}

// При натисканні на кнопку "Load more" виконуємо плавне прокручування сторінки
loadMoreBtn.addEventListener('click', async () => {
  loader.classList.remove('hidden');

  try {
    const images = await fetchImages(currentSearchQuery, currentPage + 1);
    renderImages(images);
    currentPage++; // Оновлюємо значення поточної сторінки після завантаження наступної

    // Отримуємо висоту однієї карточки галереї
    const cardHeight = document.querySelector('.card').getBoundingClientRect().height;

    // Прокручуємо сторінку на дві висоти карточки галереї з плавним ефектом
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth'
    });

  // Показуємо кнопку "Load more" після завантаження зображень
  loadMoreBtn.style.display = 'block';  

  // Перевіряємо, чи дійшли до кінця результатів пошуку
  if (images.length < 14) { // Перевіряємо кількість нових зображень
    hideLoadMoreButton();
    showEndMessage();
  }
} catch (error) {
  console.error('Error searching for images:', error);
} finally {
  loader.classList.add('hidden');
}
});

