import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { fetchVehicleById } from '../api/ghibliApi';
import { IFilm, ILocation, IPerson, IVehicle, IVehiclesDetailsProps } from '../interfaces/propsComponents';
import { IRootState } from '../interfaces/state';
import { getFilms } from '../redux/actions/filmsAction';
import { getLocations } from '../redux/actions/locationsAction';
import { getPeople } from '../redux/actions/peopleAction';
import { getSpecies } from '../redux/actions/speciesAction';

function VehiclesDetails({id, allFilms, fetchFilm, fetchLocations, fetchSpecies, fetchPeople, allLocations, allPeople}: IVehiclesDetailsProps) {
  const [vehicle, setVehicle] = useState<IVehicle>({} as IVehicle);
  const [people, setPeople] = useState<IPerson[]>({} as IPerson[])
  const [films, setFilms] = useState<IFilm[]>([] as IFilm[]);
  const [locations, setLocations] = useState<ILocation[]>([] as ILocation[]);

  useEffect(() => {
    const fetchData = async() => {
      await fetchFilm()
      await fetchLocations()
      await fetchSpecies()
      await fetchPeople()
      const responseVehicle = await fetchVehicleById(id);
      setVehicle(responseVehicle);
    };
    fetchData()
  }, [])


  useEffect(() => {
    getPeopleByVehicle()
    getFilmsByVehicle()
    getLocationByVehicle()
  }, [vehicle])
  
  function getFilmsByVehicle() {
    const filteredFilms = allFilms
      .filter((film) => vehicle.films
        .find((urlFilm) => urlFilm.includes(film.id)));
    setFilms(filteredFilms);
  }
  
  function getPeopleByVehicle() {
    const filteredPeople = allPeople
      .filter((person) => vehicle.pilot.includes(person.id))
    setPeople(filteredPeople);
  }

  function getLocationByVehicle() {
    const filteredLocations = allLocations
      .filter((location) => people
        .find(({id}) => location.residents
          .find(((urlResidents) => urlResidents.includes(id)))));
    setLocations(filteredLocations);
  }

  return (
    <main>
      <section>
        <div>
          <h2>{vehicle.name}</h2>
          <p>Classe:
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
        <h3>Pilot</h3>
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
      { locations.length > 0 ? (
        <div>
        <h3>Locations</h3>
        { locations.map((location) => (
          <div key={location.id}>
            <h4>{location.name}</h4>
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
        ))}
      </div>
      ) : null }
    </main>
  )
}

const mapState = (state: IRootState) => ({
  allPeople: state.peopleReducer.allPeople,
  allFilms: state.filmsReducer.allFilms,
  allLocations: state.locationsReducer.allLocations,
  allSpecies: state.speciesReducer.allSpecies,
});

const mapDispatch = (dispatch: ThunkDispatch<null, null, AnyAction>) => ({
  fetchFilm: () => dispatch(getFilms()),
  fetchLocations: () => dispatch(getLocations()),
  fetchSpecies: () => dispatch(getSpecies()),
  fetchPeople: () => dispatch(getPeople()),
});

export default connect(mapState, mapDispatch)(VehiclesDetails)