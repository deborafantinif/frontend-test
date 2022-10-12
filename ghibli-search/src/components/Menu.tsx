import { List, X } from 'phosphor-react';
import React, { useState } from 'react';
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
        <a data-cy="link-films" href="/films">
          Films
        </a>
        <a data-cy="link-people" href="/people">
          People
        </a>
        <a data-cy="link-locations" href="/locations">
          Locations
        </a>
        <a data-cy="link-species" href="/species">
          Species
        </a>
        <a data-cy="link-vehicles" href="/vehicles">
          Vehicles
        </a>
      </nav>
    </details>
  );
}