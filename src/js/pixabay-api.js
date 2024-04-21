import axios from 'axios'; // Імпортуємо Axios замість fetch

// Оновлена функція для виконання запиту до API Pixabay з використанням Axios
export async function fetchImages(searchQuery, page = 1, perPage = 15) {
  const apiKey = '43059810-21766dfeafea29ca9c24ae0e2';
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(url);
    return response.data.hits;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
