import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Ініціалізація SimpleLightbox
const lightbox = new SimpleLightbox('#gallery a', {});

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

  // Перевірка, чи дійшли до кінця результатів пошуку
  if (gallery.children.length >= totalHits) {
    hideLoadMoreButton();
    showEndMessage();
  } else {
    // Викликаємо метод refresh для оновлення SimpleLightbox
    lightbox.refresh();
  }
}

// Функція для плавного прокручування сторінки до нижнього краю останнього завантаженого зображення
export function smoothScrollByCardHeight() {
  const gallery = document.getElementById('gallery');
  const lastImage = gallery.lastElementChild;
  const lastImageHeight = lastImage.offsetHeight;
  const lastImageOffset = lastImage.offsetTop;

  window.scrollTo({
    top: lastImageOffset + lastImageHeight,
    behavior: 'smooth'
  });
}

// Функція для приховання кнопки "Load more"
export function hideLoadMoreButton() {
  const loadMoreBtn = document.getElementById('load-more-btn');
  loadMoreBtn.style.display = 'none';
}

// Функція для відображення повідомлення про кінець результатів пошуку
export function showEndMessage() {
  const endMessage = document.getElementById('end-message');
  endMessage.style.display = 'block';
}
