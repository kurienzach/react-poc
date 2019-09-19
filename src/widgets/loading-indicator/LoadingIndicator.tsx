import React from 'react';
import styles from './LoadingIndicator.module.css'

const LoadingIndicator: React.FC = () => (
   <img
      className={styles.loading}
      src={process.env.PUBLIC_URL + '/loading.gif'}
      alt={'Loading'}/>
);

export default LoadingIndicator;