import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { fetchLocationById } from '../api/ghibliApi';
import { IFilm, ILocation, ILocationDetailsProps, IPerson, IVehicle } from '../interfaces/propsComponents';
import { IRootState } from '../interfaces/state';
import { getFilms } from '../redux/actions/filmsAction';
import { getPeople } from '../redux/actions/peopleAction';
import { getSpecies } from '../redux/actions/speciesAction';
import { getVehicles } from '../redux/actions/vehiclesAction';
import styles from '../styles/Details.module.css';
import { Loading } from './Loading';

function LocationDetails({id, allFilms, fetchFilm, fetchSpecies, fetchVehicles, fetchPeople, allSpecies, allPeople, allVehicles}: ILocationDetailsProps) {
  const [location, setLocation] = useState<ILocation>({} as ILocation);
  const [people, setPeople] = useState<IPerson[]>({} as IPerson[])
  const [films, setFilms] = useState<IFilm[]>([] as IFilm[]);
  const [vehicles, setVehicles] = useState<IVehicle[]>([] as IVehicle[]);

  useEffect(() => {
    const fetchData = async() => {
      await fetchFilm()
      await fetchSpecies()
      await fetchVehicles()
      await fetchPeople()
      const responseLocation = await fetchLocationById(id);
      setLocation(responseLocation);
    };
    fetchData()
  }, [])


  useEffect(() => {
    getPeopleByLocation()
    getVehiclesByLocation()
    getFilmsByLocation()
  }, [location])


  function getPeopleByLocation() {
    const filteredPeople = allPeople
      .filter((person) => location.residents
        .find((urlPerson) => urlPerson.includes(person.id)))
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

  function getVehiclesByLocation() {
    const filteredVehicles = allVehicles
      .filter((vehicle) => people
        .find(({id}) => vehicle.pilot.includes(id)));
    setVehicles(filteredVehicles);
  }

  function getFilmsByLocation() {
    const filteredFilms = allFilms
      .filter((film) => location.films
        .find((urlFilm) => urlFilm.includes(film.id)));
    setFilms(filteredFilms);
  }

  return (
    (!location.climate) ? <Loading/> : (
      <main className={styles.main}>
      <section className={styles.info}>
        <div>
          <h2>{location.name}</h2>
          <p>Climate:
            {' '}
            {location.climate}
          </p>
          <p>Terrain:
            {' '}
            {location.terrain}
          </p>
          <p>Surface Water:
            {' '}
            {location.surface_water}
          </p>
        </div>
      </section>
      { films.length > 0 ? (
        <div className={styles.content}>
        <h3>Films</h3>
        <div className={styles.cardsMovie}>
        { films.map((film) => (
          <div key={film.id}>
            <h4>{film.title}</h4>
            <span>{film.original_title} - </span>
            <span>{film.release_date}</span>
            <p><b>Score:</b>
              {' '}
              {film.rt_score}
            </p>
            <p><b>Duration:</b>
              {' '}
              {film.running_time}
            </p>
            <p><b>Director:</b>
              {' '}
              {film.director}
            </p>
            <p><b>Producer:</b>
              {' '}
              {film.producer}
            </p>
            <p><b>Description:</b>
              {' '}
              {film.description}
            </p>
          </div>
        ))}
        </div>
      </div>
      ): null}
      { people.length > 0 ? (
        <div className={styles.content}>
        <h3>People</h3>
        <div className={styles.cards}>
        { people.map((person) => (
          <div key={person.id}>
            <h4>{person.name}</h4>
            <span>{person.gender}</span>
            <p>{person.age}</p>
            <p>Age:
              {' '}
              {person.age}
            </p>
            <p>Eye Color:
              {' '}
              {person.eye_color}
            </p>
            <p>Hair Color:
              {' '}
              {person.hair_color}
            </p>
          </div>
        ))}
        </div>
      </div>
      ) : null }
      { vehicles.length > 0 ? (
        <div className={styles.content}>
        <h3>Vehicles</h3>
        <div className={styles.cards}>
        {vehicles.map((vehicle) => (
          <div key={vehicle.id}>
            <h3>{vehicle.name}</h3>
            <p>Classification:
              {' '}
              {vehicle.vehicle_class}
            </p>
            <p>Length:
              {' '}
              {vehicle.length}
            </p>
            <p>Description:
              {' '}
              {vehicle.description}
            </p>
          </div>
        ))}
        </div>
      </div>
      ): null}
    </main>
    )
  )
}

const mapState = (state: IRootState) => ({
  allPeople: state.peopleReducer.allPeople,
  allFilms: state.filmsReducer.allFilms,
  allSpecies: state.speciesReducer.allSpecies,
  allVehicles: state.vehiclesReducer.allVehicles,
});

const mapDispatch = (dispatch: ThunkDispatch<null, null, AnyAction>) => ({
  fetchFilm: () => dispatch(getFilms()),
  fetchSpecies: () => dispatch(getSpecies()),
  fetchVehicles: () => dispatch(getVehicles()),
  fetchPeople: () => dispatch(getPeople()),
});

export default connect(mapState, mapDispatch)(LocationDetails)