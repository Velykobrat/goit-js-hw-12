import { fetchImages } from './js/pixabay-api.js';
import { renderImages, hideLoadMoreButton, showEndMessage } from './js/render-functions.js';

const searchForm = document.getElementById('search-form');
const loader = document.getElementById('loader');
const loadMoreBtn = document.getElementById('load-more-btn');
const endMessage = document.getElementById('end-message');
let currentSearchQuery = '';
let currentPage = 1;

// Функція для приховування повідомлення про кінець результатів
export function hideEndMessage() {
  const endMessage = document.getElementById('end-message');
  endMessage.style.display = 'none';
}


// Використовуємо searchForm у слухачі подій
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

  // Викликаємо функцію для приховування повідомлення про кінець результатів перед новим запитом
hideEndMessage();

  try {
    const images = await fetchImages(searchQuery);
    const totalHits = images.totalHits;
    renderImages(images, totalHits);
  
    // Перевіряємо, чи отримано зображення після сабміту
    if (images.length === 0) {
      hideLoadMoreButton(); // Приховуємо кнопку, якщо не отримано жодного зображення
      showEndMessage();
    } else {
      // Перевіряємо, чи вже відображено всі доступні зображення
// Перевірка кількості отриманих зображень і відображення кнопки "Load more" або повідомлення про кінець результатів
if (images.length < 15) {
  hideLoadMoreButton(); // Приховуємо кнопку, якщо кількість отриманих зображень менша за 15
  showEndMessage(); // Відображаємо повідомлення про кінець результатів
} else {
  loadMoreBtn.style.display = 'block'; // Відображаємо кнопку "Load more", якщо кількість отриманих зображень більша або дорівнює 15
}

    }
  } catch (error) {
    console.error('Error searching for images:', error);
    hideLoadMoreButton(); // Приховуємо кнопку у випадку невалідного запиту
  } finally {
    loader.classList.add('hidden');
  }
});

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

// Перевірка кількості отриманих зображень і відображення кнопки "Load more" або повідомлення про кінець результатів
if (images.length < 15) {
  hideLoadMoreButton(); // Приховуємо кнопку, якщо кількість отриманих зображень менша за 15
  showEndMessage(); // Відображаємо повідомлення про кінець результатів
} else {
  loadMoreBtn.style.display = 'block'; // Відображаємо кнопку "Load more", якщо кількість отриманих зображень більша або дорівнює 15
}

  } catch (error) {
    console.error('Error searching for images:', error);
  } finally {
    loader.classList.add('hidden');
  }
});


