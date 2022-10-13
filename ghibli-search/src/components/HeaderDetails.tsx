import React from 'react';
import { Menu } from './Menu';
import styles from '../styles/HeaderDetails.module.css'

export function HeaderDetails() {
  return (
    <header className={styles.header}>
      <Menu />
      <h1>GHIBLI SEARCH</h1>
    </header>
  );
}