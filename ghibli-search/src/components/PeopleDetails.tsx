import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { fetchPersonById } from '../api/ghibliApi';
import { ILocation, IPerson, ISpecie, IVehicle } from '../interfaces/endpoints';
import { IPeopleDetailsProps } from '../interfaces/propsComponents';
import { IRootState } from '../interfaces/state';
import { getFilms } from '../redux/actions/filmsAction';
import { getLocations } from '../redux/actions/locationsAction';
import { getSpecies } from '../redux/actions/speciesAction';
import { getVehicles } from '../redux/actions/vehiclesAction';
import styles from "../styles/Details.module.css";
import { Loading } from './Loading';

function PeopleDetails({id, allFilms, fetchFilm, fetchSpecies, fetchVehicles, fetchLocation, allSpecies, allLocations, allVehicles}: IPeopleDetailsProps) {
  const [person, setPerson] = useState<IPerson>({} as IPerson);
  const [specie, setSpecie] = useState<ISpecie[]>({} as ISpecie[]);
  const [locations, setLocations] = useState<ILocation[]>([] as ILocation[]);
  const [vehicles, setVehicles] = useState<IVehicle[]>([] as IVehicle[]);

  useEffect(() => {
    const fetchData = async() => {
      await fetchFilm()
      await fetchSpecies()
      await fetchVehicles()
      await fetchLocation()
      const responsePerson = await fetchPersonById(id);
      setPerson(responsePerson);
    };
    fetchData()
  }, [])

  useEffect(() => {
    getSpecieByPerson()
    getLocationsByResidents()
    getVehiclesByPilot()
  }, [allFilms, allSpecies, allLocations, allVehicles])

  function getSpecieByPerson() {
    const filteredSpecie = allSpecies
    .filter((specie) => specie.people
      .find((urlPerson) => urlPerson.includes(person.id)))
    setSpecie(filteredSpecie);
  }

  function getLocationsByResidents() {
    const filteredLocations = allLocations
      .filter((location) => location.residents
        .find((urlPeople) => urlPeople.includes(person.id)))
    setLocations(filteredLocations);
  }

  function getVehiclesByPilot() {
    const filteredVehicles = allVehicles
      .filter((vehicle) => vehicle.pilot.includes(person.id));
    setVehicles(filteredVehicles);
  }

  return !person.name ? (
    <Loading />
  ) : (
    <main className={styles.main}>
      <section className={styles.info}>
        <h2>{person.name}</h2>
        <span>{person.gender}</span>
        <p>
          <b>Age:</b> {person.age}
        </p>
        <p>
          <b>Eye Color:</b> {person.eye_color}
        </p>
        <p>
          <b>Hair Color:</b> {person.hair_color}
        </p>
      </section>
      {specie.length > 0 ? (
        <div className={styles.content}>
          <h3>Specie</h3>
          <div className={styles.cards}>
            {specie.map((specie) => (
              <div key={specie.id}>
                <p>{specie.name}</p>
                <p>Classification: {specie.classification}</p>
                <p>Eye Color: {specie.eye_colors}</p>
                <p>Hair Color: {specie.hair_colors}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {locations.length > 0 ? (
        <div>
          <h3>Locations</h3>
          {locations.map((location) => (
            <div key={location.id}>
              <p>{location.name}</p>
              <p>Climate: {location.climate}</p>
              <p>Terrain: {location.terrain}</p>
              <p>Surface Water: {location.surface_water}</p>
            </div>
          ))}
        </div>
      ) : null}
      {vehicles.length > 0 ? (
        <div>
          <h3>Vehicles</h3>
          {vehicles.map((vehicle) => (
            <div key={vehicle.id}>
              <h3>{vehicle.name}</h3>
              <p>Classification: {vehicle.vehicle_class}</p>
              <p>Length: {vehicle.length}</p>
              <p>Pilot: {person.name}</p>
              <p>Description: {vehicle.description}</p>
            </div>
          ))}
        </div>
      ) : null}
    </main>
  );
}

const mapState = (state: IRootState) => ({
  allPeople: state.peopleReducer.allPeople,
  allFilms: state.filmsReducer.allFilms,
  allSpecies: state.speciesReducer.allSpecies,
  allVehicles: state.vehiclesReducer.allVehicles,
  allLocations: state.locationsReducer.allLocations,
});

const mapDispatch = (dispatch: ThunkDispatch<null, null, AnyAction>) => ({
  fetchFilm: () => dispatch(getFilms()),
  fetchSpecies: () => dispatch(getSpecies()),
  fetchVehicles: () => dispatch(getVehicles()),
  fetchLocation: () => dispatch(getLocations()),
});

export default connect(mapState, mapDispatch)(PeopleDetails)