import { fetchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';

const searchForm = document.getElementById('search-form');
const loader = document.getElementById('loader'); // Отримання елемента спінера
const loadMoreBtn = document.getElementById('load-more-btn');
let currentSearchQuery = ''; // Зберігаємо поточний пошуковий запит
let currentPage = 1; // Ініціалізуємо currentPage

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

  currentSearchQuery = searchQuery; // Оновлюємо поточний пошуковий запит
  currentPage = 1; // Повертаємо поточну сторінку до початкового значення

  loader.classList.remove('hidden');

  try {
    const images = await fetchImages(searchQuery);
    const totalHits = images.totalHits; // Отримання загальної кількості зображень
    renderImages(images, totalHits);
  
    // Показуємо кнопку "Load more" після завантаження зображень
    loadMoreBtn.style.display = 'block';
  } catch (error) {
    console.error('Error searching for images:', error);
  } finally {
    loader.classList.add('hidden');
  }
});

  // Функція для визначення висоти однієї карточки галереї
function getCardHeight() {
  const card = document.querySelector('.card');
  if (card) {
    const cardRect = card.getBoundingClientRect();
    return cardRect.height;
  }
  return 0; // Повертаємо 0 у випадку, якщо карточка не знайдена
}

// Функція для плавного прокручування сторінки
function smoothScrollByCardHeight() {
  const cardHeight = getCardHeight();
  if (cardHeight !== 0) {
    window.scrollBy({
      top: cardHeight * 2, // Прокручуємо сторінку на дві висоти карточки
      behavior: 'smooth' // Встановлюємо плавність прокрутки
    });
  }
}

// При натисканні на кнопку "Load more" виконуємо плавну прокрутку сторінки
loadMoreBtn.addEventListener('click', async () => {
  loader.classList.remove('hidden');

  try {
    const images = await fetchImages(currentSearchQuery, currentPage + 1);
    renderImages(images);
    currentPage++; // Оновлюємо значення поточної сторінки після завантаження наступної

    // Викликаємо функцію для плавного прокручування сторінки
    smoothScrollByCardHeight();
  } catch (error) {
    console.error('Error loading more images:', error);
  } finally {
    loader.classList.add('hidden');
  }
});
