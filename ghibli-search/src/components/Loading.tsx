import { CircleNotch } from 'phosphor-react';
import React from 'react';
import styles from '../styles/Loading.module.css';

export function Loading() {
  return (
    <div className={styles.loading}>
      <CircleNotch size={30} className={styles.loader}/>
      <h3>Loading...</h3>
    </div>
  )
}