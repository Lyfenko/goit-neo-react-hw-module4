import styles from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick }) => {
  return (
    <button className={styles.loadMore} onClick={onClick}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
