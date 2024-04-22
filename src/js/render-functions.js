// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

// Функція для додавання нових зображень під попередніми
export function renderImages(images, totalHits) {
  const gallery = document.getElementById('gallery');

  images.forEach(image => {
    const cardHTML = `
      <div class="card">
        <a href="${image.largeImageURL}" data-lightbox="image">
          <img src="${image.webformatURL}" alt="${image.tags}">
        </a>
        <div class="info">
          <p><strong>Likes</strong> <br>${image.likes}</p>
          <p><strong>Views</strong> <br>${image.views}</p>
          <p><strong>Comments</strong> <br>${image.comments}</p>
          <p><strong>Downloads</strong> <br>${image.downloads}</p>
        </div>
      </div>
    `;

    // Додаємо нову картку зображення під попередніми
    gallery.insertAdjacentHTML('beforeend', cardHTML);
  });

  // Після додавання нових елементів до галереї, викликаємо метод refresh
  const lightbox = new SimpleLightbox('#gallery a', {});
  lightbox.refresh();

  // Перевірка, чи дійшли до кінця результатів пошуку
  if (gallery.children.length >= totalHits) {
    hideLoadMoreButton();
    showEndMessage();
  }
}

  // Функція для приховання кнопки "Load more"
  function hideLoadMoreButton() {
  const loadMoreBtn = document.getElementById('load-more-btn');
  loadMoreBtn.style.display = 'none';
}

  // Функція для відображення повідомлення про кінець результатів пошуку
  function showEndMessage() {
  const endMessage = document.getElementById('end-message');
  endMessage.style.display = 'block';
}