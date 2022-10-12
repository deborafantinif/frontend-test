import { MagnifyingGlass, Plus } from "phosphor-react";
import React, { ChangeEvent } from "react";
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import {IHeaderHomeProps} from "../interfaces/propsComponents";
import { IRootState } from "../interfaces/state";
import { getFilmsByTitle, handleMoreFilters } from "../redux/actions/filmsAction";
import { getLocationByName } from "../redux/actions/locationsAction";
import { getPeopleByName } from "../redux/actions/peopleAction";
import { getSpeciesByName } from "../redux/actions/speciesAction";
import { getVehiclesByName } from "../redux/actions/vehiclesAction";
import FilmsFilter from "./FilmsFilter";
import LocationsFilter from "./LocationsFilter";
import { Menu } from "./Menu";
import PeopleFilter from "./PeopleFilter";
import SpeciesFilter from "./SpeciesFilter";
import VehiclesFilter from "./VehiclesFilter";
import styles from '../styles/HeaderHome.module.css'
import { IFilm, ILocation, IPerson, ISpecie, IVehicle } from "../interfaces/endpoints";

function HeaderHome({
  allFilms,
  getFilmsByTitle,
  endpoint,
  allLocations,
  allPeople,
  allSpecies,
  allVehicles,
  getLocationsByName,
  getPeopleByName,
  getSpeciesByName,
  getVehiclesByName,
  setIsMoreFiltersSelected,
  isMoreFiltersSelected
}: IHeaderHomeProps) {
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
  function handleFilters() {
    switch (endpoint) {
      case "films":
        return <FilmsFilter/>;
      case "people":
        return <PeopleFilter/>;
      case "locations":
        return <LocationsFilter/>;
      case "species":
        return <SpeciesFilter/>;
      case "vehicles":
        return <VehiclesFilter/>;
      default:
        return null;
    }
  }
  return (
    <header className={styles.header}>
      <Menu />
      <h1 data-cy="header-title">GHIBLI SEARCH</h1>
      <input
        type="text"
        name="name"
        data-cy="header-input-filter"
        className={styles.input}
        placeholder={`Search by ${endpoint} name...`}
        onChange={(event) => handleInput(event)}
      />
      <button data-cy="header-button-filters" type="button" onClick={() => setIsMoreFiltersSelected(true)}>
        <span className={styles.filtersLong}><Plus size={15} /> FILTERS</span>
        <MagnifyingGlass size={18} className={styles.filtersThin}/>
      </button>
      { isMoreFiltersSelected ? handleFilters() : null }
    </header>
  );
}

const mapState = (state: IRootState) => ({
  allFilms: state.filmsReducer.allFilms,
  allPeople: state.peopleReducer.allPeople,
  allLocations: state.locationsReducer.allLocations,
  allSpecies: state.speciesReducer.allSpecies,
  allVehicles: state.vehiclesReducer.allVehicles,
  isMoreFiltersSelected: state.filmsReducer.isMoreFiltersSelected,
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
  setIsMoreFiltersSelected: (isSelected: boolean) =>
    dispatch(handleMoreFilters(isSelected)),
});

export default connect(mapState, mapDispatch)(HeaderHome);
