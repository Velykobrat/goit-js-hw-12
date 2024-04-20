import axios from 'axios'; // Імпортуємо Axios замість fetch

// Оновлена функція для виконання запиту до API Pixabay з використанням Axios
export async function fetchImages(searchQuery) {
    const apiKey = '43059810-21766dfeafea29ca9c24ae0e2';
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`;
  
    try {
      const response = await axios.get(url); // Використовуємо метод axios.get
      return response.data.hits; // Повертаємо дані з об'єкту response.data
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
}

// Видалення імпорту fetchImages, оскільки ця функція тепер імпортується з цього файлу
