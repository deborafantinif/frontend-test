import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IVehicleProps } from '../interfaces/propsComponents';
import styles from '../styles/Card.module.css';

export function CardVehicle({vehicle}: IVehicleProps) {
  const navigate = useNavigate();
  return (
    <section className={`${styles.card} ${styles.cardVehicle}`}>
      <h3>{vehicle.name}</h3>
      <div>
        <p>
          <b>Classification:</b>
          {" "}
          {vehicle.vehicle_class}
        </p>
        <p>
          <b>Length:</b>
          {" "}
          {vehicle.length}
        </p>
        <p>
          <b>Description:</b>
          {" "}
          {vehicle.description}
        </p>
      </div>
      <button
        type="button"
        onClick={ () => navigate(`/vehicles/${vehicle.id}`) }
      >
        READ MORE...
      </button>
    </section>
  )
}