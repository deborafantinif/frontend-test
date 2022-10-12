import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ILocationProps } from '../interfaces/propsComponents';
import styles from '../styles/Card.module.css';

export function LocationCard({location}: ILocationProps) {
  const navigate = useNavigate();
  return (
    <section className={`${styles.card} ${styles.cardLocation}`}>
      <h3>{location.name}</h3>
      <div>
        <p>
          <b>Climate:</b> {location.climate}
        </p>
        <p>
          <b>Terrain:</b> {location.terrain}
        </p>
        <p>
          <b>Surface Water:</b> {location.surface_water}
        </p>
      </div>
      <button
        type="button"
        onClick={() => navigate(`/locations/${location.id}`)}
      >
        READ MORE...
      </button>
    </section>
  );
}