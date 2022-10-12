import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ISpecieProps } from '../interfaces/propsComponents';
import styles from '../styles/Card.module.css';

export function SpecieCard({specie}: ISpecieProps) {
  const navigate = useNavigate();
  return (
    <section className={`${styles.card} ${styles.cardSpecie}`}>
      <h3>{specie.name}</h3>
      <div>
        <p>
          <b>Classification:</b> {specie.classification}
        </p>
        <p>
          <b>Eye color:</b> {specie.eye_colors}
        </p>
        <p>
          <b>Hair color:</b> {specie.hair_colors}
        </p>
      </div>
      <button type="button" onClick={() => navigate(`/species/${specie.id}`)}>
        READ MORE...
      </button>
    </section>
  );
}