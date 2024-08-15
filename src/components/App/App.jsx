import { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../../components/ImageModal/ImageModal';
import axios from 'axios';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [noResults, setNoResults] = useState(false);

const handleSearchSubmit = async (newQuery) => {
  setQuery(newQuery);
  setLoading(true);
  setError(null);
  setNoResults(false);
  setPage(1);  // Скидаємо сторінку до 1 при новому пошуку

  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: { query: newQuery, page: 1, per_page: 12 }, // Повертаємо 12 зображень на сторінку
      headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
      },
    });

    if (response.data.results.length === 0) {
      setNoResults(true);
    } else {
      setImages(response.data.results);
      setPage(2);
    }
  } catch {
    setError('Щось пішло не так, спробуйте ще раз.');
  } finally {
    setLoading(false);
  }
};

const handleLoadMore = async () => {
  setLoading(true);
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: { query, page, per_page: 12 }, // Завантажуємо ще 12 зображень
      headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
      },
    });
    setImages((prevImages) => [...prevImages, ...response.data.results]);
    setPage((prevPage) => prevPage + 1);
  } catch {
    setError('Щось пішло не так, спробуйте ще раз.');
  } finally {
    setLoading(false);
  }
};

  const openModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
    document.querySelector('header').style.display = 'none'; // Приховуємо SearchBar
  };

  const closeModal = () => {
    setSelectedImage(null);
    setShowModal(false);
    document.querySelector('header').style.display = 'block'; // Відображаємо SearchBar
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      {noResults && !loading && !error && (
        <div className="no-results">
          Нічого не знайдено. Спробуйте змінити критерії пошуку.
        </div>
      )}
      {loading && !error && !noResults && <Loader />}
      {!error && !noResults && <ImageGallery images={images} onImageClick={openModal} />}
      {!error && !noResults && images.length > 0 && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
      {showModal && <ImageModal image={selectedImage} onClose={closeModal} />}
    </div>
  );
};

export default App;
