import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IVehicleProps } from '../interfaces/propsComponents';

export function CardVehicle({vehicle}: IVehicleProps) {
  const navigate = useNavigate();
  return (
    <section>
      <h3>{vehicle.name}</h3>
      <p>
        <span>Description:</span>
        {" "}
        {vehicle.description}
      </p>
      <p>
        <span>Classification:</span>
        {" "}
        {vehicle.vehicle_class}
      </p>
      <p>
        <span>Length:</span>
        {" "}
        {vehicle.length}
      </p>
      <button
        type="button"
        onClick={ () => navigate(`/vehicles/${vehicle.id}`) }
      >
        READ MORE...
      </button>
    </section>
  )
}