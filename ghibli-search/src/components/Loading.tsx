import React from 'react';
import styles from '../styles/Loading.module.css';

export function Loading() {
  return (
    <div className={styles.loading}>
      <span className={styles.loader}></span>
      <h3>Loading...</h3>
    </div>
  )
}