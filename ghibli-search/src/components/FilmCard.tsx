import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IFilmProps } from '../interfaces/propsComponents';
import styles from '../styles/CardFilm.module.css'

export function FilmCard({film}: IFilmProps) {
  const navigate = useNavigate();
  return (
    <section className={styles.card} data-cy={`card-film-${film.id}`}>
      <div className={styles.info}>
        <div className={styles.title}>
          <h3>{film.title}</h3>
          <span> {film.release_date}</span>
          <p>{film.original_title}</p>
        </div>
        <p className={styles.score}>{film.rt_score}</p>
        <div className={styles.details}>
          <p>
            <b>Duration:</b> {film.running_time} minutes
          </p>
          <p>
            <b>Director:</b> {film.director}
          </p>
          <p>
            <b>Producer:</b> {film.producer}
          </p>
        </div>
      </div>
      <div className={styles.description}>
        <p>{film.description}</p>
        <button
          type="button"
          data-cy={`button-film-${film.id}`}
          onClick={() => navigate(`/films/${film.id}`)}
        >
          READ MORE...
        </button>
      </div>
    </section>
  );
}