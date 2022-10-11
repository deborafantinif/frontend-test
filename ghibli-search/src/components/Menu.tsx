import { List, X } from 'phosphor-react';
import React, { useState } from 'react';
import styles from '../styles/Menu.module.css'

export function Menu() {
  const [isSelectedMenu, setIsSelectedMenu] = useState(false);

  return (
    <details>
      <summary>
        { isSelectedMenu ?
        <X size={40} onClick={() => setIsSelectedMenu(!isSelectedMenu)} /> :
        <List size={40} onClick={() => setIsSelectedMenu(!isSelectedMenu)}/>
        }
      </summary>
      <nav className={styles.menu}>
        <a href="/films">Films</a>
        <a href="/people">People</a>
        <a href="/locations">Locations</a>
        <a href="/species">Species</a>
        <a href="/vehicles">Vehicles</a>
      </nav>
    </details>
  )
}