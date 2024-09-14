import { Spinner } from 'src/components/Spinner';
import styles from './Loading.module.scss';

export function Loading() {
  return (
    <div className={styles.container}>
      <Spinner />
    </div>
  );
}
