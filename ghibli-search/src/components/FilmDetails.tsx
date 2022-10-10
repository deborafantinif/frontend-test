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

function FilmsDetails({id, allPeople, fetchPeople, fetchSpecies, fetchVehicles, fetchLocation, allSpecies, allLocations, allVehicles}: IFilmDetailsProps) {
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

  return (
    <main>
      <section>
        <div>
          <h2>{film.title}</h2>
          <p>{film.original_title}</p>
          <span>{film.release_date}</span>
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
        </div>
        <p>{film.rt_score}</p>
      </section>
      <div>
        <h3>Description</h3>
        <p>{film.description}</p>
      </div>
      <div>
        <h3>People</h3>
        {people.map((person) => (
          <div key={person.id}>
            <p>{person.name}</p>
            <span>{person.gender}</span>
            <p>Age:
              {' '}
              {person.age}
            </p>
            <p>Specie:
              {' '}
              {person.species}
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
      <div>
        <h3>Locations</h3>
        {locations.map((location) => (
          <div key={location.id}>
            <p>{location.name}</p>
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
            <p>Pilot:
              {' '}
              {vehicle.pilot}
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

export default connect(mapState, mapDispatch)(FilmsDetails)