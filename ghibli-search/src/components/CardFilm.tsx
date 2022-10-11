import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IFilmProps } from '../interfaces/propsComponents';
import styles from '../styles/CardFilm.module.css'

export function CardFilm({film}: IFilmProps) {
  const navigate = useNavigate();
  return (
    <section className={styles.card}>
      <div className={styles.info}>
        <div className={styles.title}>
          <h3>{film.title}</h3>
          <span>{' '}{film.release_date}</span>
          <p>{film.original_title}</p>
        </div>
        <p className={styles.score}>{film.rt_score}</p>
        <div className={styles.details}>
          <p>
            <b>Duration:</b>
            {' '}
            {film.running_time}
          </p>
          <p>
            <b>Director:</b>
            {' '}
            {film.director}
          </p>
          <p>
            <b>Producer:</b>
            {' '}
            {film.producer}
          </p>
        </div>
      </div>
      <div className={styles.description}>
        <p>{film.description}</p>
        <button
        type="button"
        onClick={ () => navigate(`/films/${film.id}`) }
      >
        READ MORE...
      </button>
      </div>
    </section>
  )
}