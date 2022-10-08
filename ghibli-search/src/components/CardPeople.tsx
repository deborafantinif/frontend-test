import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IPersonProps } from '../interfaces/propsComponents';

export function CardPeople({person}: IPersonProps) {
  const navigate = useNavigate();
  return (
    <section>
      <h3>{person.name}</h3>
      <span>{person.gender}</span>
      <p>
        <span>Idade:</span>
        {" "}
        {person.age}
      </p>
      <p>
        <span>Eye color:</span>
        {" "}
        {person.eye_color}
      </p>
      <p>
        <span>Hair color:</span>
        {" "}
        {person.hair_color}
      </p>
      <button
        type="button"
        onClick={ () => navigate(`/people/${person.id}`) }
      >
        READ MORE...
      </button>
    </section>
  )
}