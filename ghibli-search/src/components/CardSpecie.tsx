import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ISpecieProps } from '../interfaces/propsComponents';

export function CardSpecie({specie}: ISpecieProps) {
  const navigate = useNavigate();
  return (
    <section>
      <h3>{specie.name}</h3>
      <p>
        <span>Classification:</span>
        {" "}
        {specie.classification}
      </p>
      <p>
        <span>Eye color:</span>
        {" "}
        {specie.eye_colors}
      </p>
      <p>
        <span>Hair color:</span>
        {" "}
        {specie.hair_colors}
      </p>
      <button
        type="button"
        onClick={ () => navigate(`/species/${specie.id}`) }
      >
        READ MORE...
      </button>
    </section>
  )
}