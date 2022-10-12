import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { fetchFilmsById } from '../api/ghibliApi';
import { IFilm, IFilmDetailsProps, ILocation, IPerson, IVehicle } from '../interfaces/propsComponents';
import { IRootState } from '../interfaces/state';
import { getLocations } from '../redux/actions/locationsAction';
import { getPeople } from '../redux/actions/peopleAction';
import { getSpecies } from '../redux/actions/speciesAction';
import { getVehicles } from '../redux/actions/vehiclesAction';
import styles from '../styles/FilmDetails.module.css';
import { Loading } from './Loading';

function FilmDetails({id, allPeople, fetchPeople, fetchSpecies, fetchVehicles, fetchLocation, allSpecies, allLocations, allVehicles}: IFilmDetailsProps) {
  const [film, setFilm] = useState<IFilm>({} as IFilm);
  const [people, setPeople] = useState<IPerson[]>([] as IPerson[]);
  const [locations, setLocations] = useState<ILocation[]>([] as ILocation[]);
  const [vehicles, setVehicles] = useState<IVehicle[]>([] as IVehicle[]);

  useEffect(() => {
    const fetchData = async() => {
      await fetchPeople()
      await fetchSpecies()
      await fetchVehicles()
      await fetchLocation()
      const responseFilm = await fetchFilmsById(id);
      setFilm(responseFilm);
    };
    fetchData()
  }, [])

  useEffect(() => {
    getPeopleByFilm()
    getLocationsByFilm()
    getVehiclesByFilm()
  }, [allPeople, allSpecies, film, allLocations, allVehicles])

  function getPeopleByFilm() {
    const filteredPeople = allPeople
      .filter((person) => person.films[0].includes(film.id))
    const peopleWithSpecieName = filteredPeople.map((person) => {
      const specieName = allSpecies.find((specie) => person.species.includes(specie.id))
      if (!specieName) return {
        ...person,
        species: 'not found'
      }
      return {
        ...person,
        species: specieName.name
      }
    })
    setPeople(peopleWithSpecieName);
  }

  function getLocationsByFilm() {
    const filteredLocations = allLocations
      .filter((location) => location.films
        .find((urlFilm) => urlFilm.includes(film.id)))
    setLocations(filteredLocations);
  }

  function getVehiclesByFilm() {
    const filteredVehicles = allVehicles
      .filter((vehicle) => vehicle.films
        .find((urlFilm) => urlFilm.includes(film.id)))
    const vehicleWithPilotName = filteredVehicles.map((vehicle) => {
      const pilotName = allPeople.find((person) => vehicle.pilot.includes(person.id))
      if (!pilotName) return {
        ...vehicle,
        pilot: 'not found'
      }
      return {
        ...vehicle,
        pilot: pilotName.name
      }
    })
    setVehicles(vehicleWithPilotName);
  }

  return !film.title ? (
    <Loading />
  ) : (
    <main className={styles.film}>
      <section className={styles.info}>
        <div className={styles.title}>
          <h2>{film.title}</h2>
          <span>{film.release_date}</span>
          <p>{film.original_title}</p>
        </div>
        <p><b>Duration:</b> {film.running_time}</p>
        <p><b>Director:</b> {film.director}</p>
        <p><b>Producer:</b> {film.producer}</p>
      <p className={styles.score}>{film.rt_score}</p>
      </section>
      <div className={styles.description}>
        <h3>Description</h3>
        <p>{film.description}</p>
      </div>
      {people.length > 0 ? (
        <div className={styles.content}>
          <h3>People</h3>
          <div className={styles.cards}>
          {people.map((person) => (
            <div key={person.id}>
              <h4>{person.name}</h4>
              <span>{person.gender}</span>
              <p><b>Age:</b> {person.age}</p>
              <p><b>Specie:</b> {person.species}</p>
              <p><b>Eye Color:</b> {person.eye_color}</p>
              <p><b>Hair Color:</b> {person.hair_color}</p>
            </div>
          ))}
          </div>
        </div>
      ) : null}
      {locations.length > 0 ? (
        <div className={styles.content}>
          <h3>Locations</h3>
          <div className={styles.cards}>
          {locations.map((location) => (
            <div key={location.id}>
              <h4>{location.name}</h4>
              <p><b>Climate:</b> {location.climate}</p>
              <p><b>Terrain:</b> {location.terrain}</p>
              <p><b>Surface Water:</b> {location.surface_water}</p>
            </div>
          ))}
          </div>
        </div>
      ) : null}
      {vehicles.length > 0 ? (
        <div className={styles.content}>
          <h3>Vehicles</h3>
          <div className={styles.cards}>
          {vehicles.map((vehicle) => (
            <div key={vehicle.id}>
              <h4>{vehicle.name}</h4>
              <p><b>Classification:</b> {vehicle.vehicle_class}</p>
              <p><b>Length:</b> {vehicle.length}</p>
              <p><b>Pilot:</b> {vehicle.pilot}</p>
              <p><b>Description:</b> {vehicle.description}</p>
            </div>
          ))}
          </div>
        </div>
      ) : null}
    </main>
  );
}

const mapState = (state: IRootState) => ({
  allPeople: state.peopleReducer.allPeople,
  allSpecies: state.speciesReducer.allSpecies,
  allVehicles: state.vehiclesReducer.allVehicles,
  allLocations: state.locationsReducer.allLocations,
});

const mapDispatch = (dispatch: ThunkDispatch<null, null, AnyAction>) => ({
  fetchPeople: () => dispatch(getPeople()),
  fetchSpecies: () => dispatch(getSpecies()),
  fetchVehicles: () => dispatch(getVehicles()),
  fetchLocation: () => dispatch(getLocations()),
});

export default connect(mapState, mapDispatch)(FilmDetails)