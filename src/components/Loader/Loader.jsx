import { Oval } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <Oval
        height={80}
        width={80}
        color="blue"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="gray"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default Loader;
