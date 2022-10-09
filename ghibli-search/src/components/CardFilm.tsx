import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IFilmProps } from '../interfaces/propsComponents';

export function CardFilm({film}: IFilmProps) {
  const navigate = useNavigate();
  return (
    <section>
      <div>
        <h3>{film.title}</h3>
        <span>{film.rt_score}</span>
        <span>{film.original_title}</span>
        <span>{film.release_date}</span>
        <p>
          <span>Duration:</span>
          {' '}
          {film.running_time}
        </p>
        <p>
          <span>Director:</span>
          {' '}
          {film.director}
        </p>
        <p>
          <span>Producer:</span>
          {' '}
          {film.producer}
        </p>
      </div>
      <div>
        <p>{film.description}</p>
      </div>
      <button
        type="button"
        onClick={ () => navigate(`/films/${film.id}`) }
      >
        READ MORE...
      </button>
    </section>
  )
}