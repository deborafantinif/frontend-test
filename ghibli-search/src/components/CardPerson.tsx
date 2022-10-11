import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IPersonProps } from '../interfaces/propsComponents';
import styles from '../styles/Card.module.css';

export function CardPerson({person}: IPersonProps) {
  const navigate = useNavigate();
  return (
    <section className={`${styles.card} ${styles.cardPerson}`}>
      <h3>{person.name}</h3>
      <span className={styles.gender}>{person.gender}</span>
      <div>
        <p>
          <b>Idade:</b>
          {" "}
          {person.age}
        </p>
        <p>
          <b>Eye color:</b>
          {" "}
          {person.eye_color}
        </p>
        <p>
          <b>Hair color:</b>
          {" "}
          {person.hair_color}
        </p>
      </div>
      <button
        type="button"
        onClick={ () => navigate(`/people/${person.id}`) }
      >
        READ MORE...
      </button>
    </section>
  )
}