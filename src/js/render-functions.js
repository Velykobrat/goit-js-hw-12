// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

// Функція для додавання нових зображень під попередніми
export function renderImages(images) {
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
}