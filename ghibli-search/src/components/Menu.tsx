import { List, X } from 'phosphor-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Menu.module.css'

export function Menu() {
  const [isSelectedMenu, setIsSelectedMenu] = useState(false);

  return (
    <details>
      <summary data-cy="menu-icon">
        {isSelectedMenu ? (
          <X
            size={40}
            data-cy="menu-up"
            className={styles.indexUp}
            onClick={() => setIsSelectedMenu(!isSelectedMenu)}
          />
        ) : (
          <List
            size={40}
            data-cy="menu-down"
            className={styles.indexDown}
            onClick={() => setIsSelectedMenu(!isSelectedMenu)}
          />
        )}
      </summary>
      <nav
        data-cy="menu-links"
        className={
          isSelectedMenu
            ? `${styles.menu} ${styles.indexUp}`
            : `${styles.menu} ${styles.indexDown}`
        }
      >
        <Link data-cy="link-films" to="/films">
          Films
        </Link>
        <Link data-cy="link-people" to="/people">
          People
        </Link>
        <Link data-cy="link-locations" to="/locations">
          Locations
        </Link>
        <Link data-cy="link-species" to="/species">
          Species
        </Link>
        <Link data-cy="link-vehicles" to="/vehicles">
          Vehicles
        </Link>
      </nav>
    </details>
  );
}