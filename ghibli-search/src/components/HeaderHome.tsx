import { Plus } from "phosphor-react";
import React, { ChangeEvent } from "react";
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { IFilm, IHeaderHomeProps, ILocation, IPerson, ISpecie, IVehicle } from "../interfaces/propsComponents";
import { IRootState } from "../interfaces/state";
import { getFilmsByTitle } from "../redux/actions/filmsAction";
import { getLocationByName } from "../redux/actions/locationsAction";
import { getPeopleByName } from "../redux/actions/peopleAction";
import { getSpeciesByName } from "../redux/actions/speciesAction";
import { getVehiclesByName } from "../redux/actions/vehiclesAction";
import { Menu } from "./Menu";

function HeaderHome({ allFilms, getFilmsByTitle, endpoint, allLocations, allPeople, allSpecies, allVehicles, getLocationsByName, getPeopleByName, getSpeciesByName, getVehiclesByName }: IHeaderHomeProps) {
  function searchFilmsTitle(title: string) {
    const filteredFilms = allFilms.filter((film) =>
      film.title.toLowerCase().includes(title.toLowerCase())
    );
    getFilmsByTitle(filteredFilms);
  }
  function searchPeopleName(name: string) {
    const filteredPeople = allPeople.filter((person) =>
      person.name.toLowerCase().includes(name.toLowerCase())
    );
    getPeopleByName(filteredPeople);
  }
  function searchLocationsName(name: string) {
    const filteredLocations = allLocations.filter((location) =>
      location.name.toLowerCase().includes(name.toLowerCase())
    );
    getLocationsByName(filteredLocations);
  }
  function searchSpeciesName(name: string) {
    const filteredSpecies = allSpecies.filter((specie) =>
      specie.name.toLowerCase().includes(name.toLowerCase())
    );
    getSpeciesByName(filteredSpecies);
  }
  function searchVehiclesName(name: string) {
    const filteredVehicles = allVehicles.filter((vehicle) =>
      vehicle.name.toLowerCase().includes(name.toLowerCase())
    );
    getVehiclesByName(filteredVehicles);
  }
  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    switch (endpoint) {
      case "films":
        return searchFilmsTitle(event.target.value);
      case "people":
        return searchPeopleName(event.target.value);
      case "locations":
        return searchLocationsName(event.target.value);
      case "species":
        return searchSpeciesName(event.target.value);
      case "vehicles":
        return searchVehiclesName(event.target.value);
      default:
        return null;
    }
  }
  return (
    <header>
      <Menu />
      <h1>GHIBLI SEARCH</h1>
      <input
        type="text"
        name="name"
        placeholder="Search by movie name..."
        onChange={(event) => handleInput(event)}
      />
      <button type="button">
        <Plus size={25} /> FILTERS
      </button>
    </header>
  );
}

const mapState = (state: IRootState) => ({
  allFilms: state.filmsReducer.allFilms,
  allPeople: state.peopleReducer.allPeople,
  allLocations: state.locationsReducer.allLocations,
  allSpecies: state.speciesReducer.allSpecies,
  allVehicles: state.vehiclesReducer.allVehicles,
});

const mapDispatch = (dispatch: ThunkDispatch<null, null, AnyAction>) => ({
  getFilmsByTitle: (filteredFilms: IFilm[]) =>
    dispatch(getFilmsByTitle(filteredFilms)),
  getPeopleByName: (filteredPeople: IPerson[]) =>
    dispatch(getPeopleByName(filteredPeople)),
  getLocationsByName: (filteredLocations: ILocation[]) =>
    dispatch(getLocationByName(filteredLocations)),
  getSpeciesByName: (filteredSpecies: ISpecie[]) =>
    dispatch(getSpeciesByName(filteredSpecies)),
  getVehiclesByName: (filteredVehicles: IVehicle[]) =>
    dispatch(getVehiclesByName(filteredVehicles)),
});

export default connect(mapState, mapDispatch)(HeaderHome);
