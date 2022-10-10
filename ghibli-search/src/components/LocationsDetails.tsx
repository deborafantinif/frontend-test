import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { fetchLocationById, fetchPersonById } from '../api/ghibliApi';
import { IFilm, ILocation, ILocationDetailsProps, IPeopleDetailsProps, IPerson, ISpecie, IVehicle } from '../interfaces/propsComponents';
import { IRootState } from '../interfaces/state';
import { getFilms } from '../redux/actions/filmsAction';
import { getLocations } from '../redux/actions/locationsAction';
import { getPeople } from '../redux/actions/peopleAction';
import { getSpecies } from '../redux/actions/speciesAction';
import { getVehicles } from '../redux/actions/vehiclesAction';

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
      console.log(responseLocation)
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
    <main>
      <section>
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
      <div>
        <h3>Films</h3>
        { films.map((film) => (
          <div key={film.id}>
            <h4>{film.title}</h4>
            <span>{film.release_date}</span>
            <span>{film.original_title}</span>
            <p>{film.rt_score}</p>
            <p>Duration:
              {' '}
              {film.running_time}
            </p>
            <p>Director:
              {' '}
              {film.director}
            </p>
            <p>Producer:
              {' '}
              {film.producer}
            </p>
            <p>Description:
              {' '}
              {film.description}
            </p>
          </div>
        ))}
      </div>
      { people.length > 0 ? (
        <div>
        <h3>People</h3>
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
      ) : null }
      <div>
        <h3>Vehicles</h3>
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
    </main>
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