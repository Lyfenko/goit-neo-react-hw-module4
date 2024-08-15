import { FaHeart } from 'react-icons/fa';
import ReactModal from 'react-modal';
import styles from './ImageModal.module.css';

ReactModal.setAppElement('#root');

const ImageModal = ({ image, onClose }) => {
if (!image) return null;

  console.log(image); // Перевірка структури об'єкта image

  return (
    <ReactModal
      isOpen={!!image}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <button onClick={onClose} className={styles.closeButton}>Close</button>
      <img src={image.urls.regular} alt={image.alt_description} />
      <p className={styles.author}>Автор: {image.user.name}</p>
      <div className={styles.likes}>
        <FaHeart /> <span>{image.likes}</span>
      </div>
    </ReactModal>
  );
};

export default ImageModal;
