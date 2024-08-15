import { useState } from 'react';
import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('Введіть текст для пошуку!');
      return;
    }
    onSubmit(query);
  };

  return (
    <header className={styles.header}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search images and photos"
          autoComplete="off"
          autoFocus
        />
        <button className={styles.button} type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;
