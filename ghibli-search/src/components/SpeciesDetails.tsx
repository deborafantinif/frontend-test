import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { fetchSpeciesById } from '../api/ghibliApi';
import { IFilm, ILocation, IPerson, ISpecie, ISpeciesDetailsProps, IVehicle } from '../interfaces/propsComponents';
import { IRootState } from '../interfaces/state';
import { getFilms } from '../redux/actions/filmsAction';
import { getLocations } from '../redux/actions/locationsAction';
import { getPeople } from '../redux/actions/peopleAction';
import { getVehicles } from '../redux/actions/vehiclesAction';

function SpeciesDetails({id, allFilms, fetchFilm, fetchLocations, fetchVehicles, fetchPeople, allLocations, allPeople, allVehicles}: ISpeciesDetailsProps) {
  const [specie, setSpecie] = useState<ISpecie>({} as ISpecie);
  const [people, setPeople] = useState<IPerson[]>({} as IPerson[])
  const [films, setFilms] = useState<IFilm[]>([] as IFilm[]);
  const [vehicles, setVehicles] = useState<IVehicle[]>([] as IVehicle[]);
  const [locations, setLocations] = useState<ILocation[]>([] as ILocation[]);

  useEffect(() => {
    const fetchData = async() => {
      await fetchFilm()
      await fetchLocations()
      await fetchVehicles()
      await fetchPeople()
      const responseSpecie = await fetchSpeciesById(id);
      setSpecie(responseSpecie);
    };
    fetchData()
  }, [])


  useEffect(() => {
    getPeopleBySpecie()
    getVehiclesBySpecie()
    getFilmsBySpecie()
    getLocationBySpecie()
  }, [specie])
  
  function getFilmsBySpecie() {
    const filteredFilms = allFilms
      .filter((film) => specie.films
        .find((urlFilm) => urlFilm.includes(film.id)));
    setFilms(filteredFilms);
  }
  
  function getPeopleBySpecie() {
    const filteredPeople = allPeople
      .filter((person) => specie.people
        .find((urlPerson) => urlPerson.includes(person.id)))
    setPeople(filteredPeople);
  }

  function getVehiclesBySpecie() {
    const filteredVehicles = allVehicles
      .filter((vehicle) => people
        .find(({id}) => vehicle.pilot.includes(id)));
    setVehicles(filteredVehicles);
  }

  function getLocationBySpecie() {
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
          <h2>{specie.name}</h2>
          <p>Classification:
            {' '}
            {specie.classification}
          </p>
          <p>Eye Colors:
            {' '}
            {specie.eye_colors}
          </p>
          <p>Hair Colors:
            {' '}
            {specie.hair_colors}
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
  allVehicles: state.vehiclesReducer.allVehicles,
});

const mapDispatch = (dispatch: ThunkDispatch<null, null, AnyAction>) => ({
  fetchFilm: () => dispatch(getFilms()),
  fetchLocations: () => dispatch(getLocations()),
  fetchVehicles: () => dispatch(getVehicles()),
  fetchPeople: () => dispatch(getPeople()),
});

export default connect(mapState, mapDispatch)(SpeciesDetails)