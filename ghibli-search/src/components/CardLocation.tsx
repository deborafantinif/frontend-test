import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ILocationProps } from '../interfaces/propsComponents';

export function CardLocation({location}: ILocationProps) {
  const navigate = useNavigate();
  return (
    <section>
      <h3>{location.name}</h3>
      <p>
        <span>Climate:</span>
        {" "}
        {location.climate}
      </p>
      <p>
        <span>Terrain:</span>
        {" "}
        {location.terrain}
      </p>
      <p>
        <span>Surface Water:</span>
        {" "}
        {location.surface_water}
      </p>
      <button
        type="button"
        onClick={ () => navigate(`/locations/${location.id}`) }
      >
        READ MORE...
      </button>
    </section>
  )
}