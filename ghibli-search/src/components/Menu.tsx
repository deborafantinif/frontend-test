import { List, X } from 'phosphor-react';
import React, { useState } from 'react';
import styles from '../styles/Menu.module.css'

export function Menu() {
  const [isSelectedMenu, setIsSelectedMenu] = useState(false);

  return (
    <details>
      <summary>
        { isSelectedMenu ?
        <X size={40} className={styles.indexUp} onClick={() => setIsSelectedMenu(!isSelectedMenu)} /> :
        <List size={40} className={styles.indexDown} onClick={() => setIsSelectedMenu(!isSelectedMenu)}/>
        }
      </summary>
      <nav className={ (isSelectedMenu) ? `${styles.menu} ${styles.indexUp}` : `${styles.menu} ${styles.indexDown}`}>
        <a href="/films">Films</a>
        <a href="/people">People</a>
        <a href="/locations">Locations</a>
        <a href="/species">Species</a>
        <a href="/vehicles">Vehicles</a>
      </nav>
    </details>
  )
}