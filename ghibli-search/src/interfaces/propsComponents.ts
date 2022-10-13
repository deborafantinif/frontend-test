export interface IFilm {
  id: string,
  title: string,
  original_title: string,
  description: string,
  director: string,
  producer: string,
  release_date: string,
  running_time: string,
  rt_score: string,
  people: string[],
  locations: string[],
  vehicles: string[],
  url: string,
}

export interface IPerson {
  id: string,
  name: string,
  gender: string,
  age: string,
  eye_color: string,
  hair_color: string,
  films: string[],
  species: string,
  url: string,
}

export interface ILocation {
  id: string,
  name: string,
  climate: string,
  terrain: string,
  surface_water: string,
  residents: string[],
  films: string[],
  url: string,
}

export interface ISpecie {
  id: string,
  name: string,
  classification: string,
  eye_colors: string,
  hair_colors: string,
  people: string[],
  films: string[],
  url: string,
}

export interface IVehicle {
  id: string,
  name: string,
  description: string,
  vehicle_class: string,
  length: string,
  pilot: string,
  films: string[],
  url: string,
}

export interface IHeaderHomeProps {
  endpoint: string,
  isMoreFiltersSelected: boolean,
  setIsMoreFiltersSelected(isSelected: boolean): void,
  allFilms: IFilm[],
  getFilmsByTitle(filteredFilms: IFilm[]): void,
  allPeople: IPerson[],
  getPeopleByName(filteredPeople: IPerson[]): void,
  allLocations: ILocation[],
  getLocationsByName(filteredLocations: ILocation[]): void,
  allSpecies: ISpecie[],
  getSpeciesByName(filteredSpecies: ISpecie[]): void,
  allVehicles: IVehicle[],
  getVehiclesByName(filteredVehicles: IVehicle[]): void,
}

export interface IFilterProps {
  setIsMoreFiltersSelected(isSelected: boolean): void,
  allFilms: IFilm[],
}

export interface IFilmsFilterProps extends IFilterProps {
  allLocations: ILocation[],
  fetchLocations(): void,
  requestWithFilter(films: IFilm[]): void,
}

export interface IPeopleFilterProps extends IFilterProps {
  allLocations: ILocation[],
  allPeople: IPerson[],
  fetchLocations(): void,
  fetchFilms(): void,
  requestWithFilter(films: IPerson[]): void,
}

export interface ILocationsFilterProps extends IFilterProps {
  allLocations: ILocation[],
  fetchFilms(): void,
  requestWithFilter(locations: ILocation[]): void,
}

export interface ISpeciesFilterProps extends IFilterProps {
  allSpecies: ISpecie[],
  fetchFilms(): void,
  requestWithFilter(species: ISpecie[]): void,
}

export interface IVehiclesFilterProps extends IFilterProps {
  allVehicles: IVehicle[],
  fetchFilms(): void,
  requestWithFilter(vehicles: IVehicle[]): void,
}

interface IDefaultEndpointsProps {
  loading: boolean,
  error: string,
}

export interface IFilmsProps extends IDefaultEndpointsProps {
  films: IFilm[],
  fetchFilms(): void,
}

export interface IFilmProps {
  film: IFilm,
}

export interface IPeopleProps extends IDefaultEndpointsProps {
  people: IPerson[],
  fetchPeople(): void,
}

export interface IPersonProps {
  person: IPerson,
}

export interface ILocationsProps extends IDefaultEndpointsProps {
  locations: ILocation[],
  fetchLocations(): void,
}

export interface ILocationProps {
  location: ILocation,
}

export interface ISpeciesProps extends IDefaultEndpointsProps {
  species: ISpecie[],
  fetchSpecies(): void,
}

export interface ISpecieProps {
  specie: ISpecie,
}

export interface IVehiclesProps extends IDefaultEndpointsProps {
  vehicles: IVehicle[],
  fetchVehicles(): void,
}

export interface IVehicleProps {
  vehicle: IVehicle,
}

export interface IDetailsProps {
  endpoint: string,
}

export interface IDefaultDetailsProps {
  id: string,
}

export interface IFilmDetailsProps extends IDefaultDetailsProps {
  allPeople: IPerson[],
  allSpecies: ISpecie[],
  allVehicles: IVehicle[],
  allLocations: ILocation[],
  fetchPeople(): void;
  fetchSpecies(): void;
  fetchVehicles(): void;
  fetchLocation(): void;
}

export interface IPeopleDetailsProps extends IDefaultDetailsProps {
  allFilms: IFilm[],
  allSpecies: ISpecie[],
  allVehicles: IVehicle[],
  allLocations: ILocation[],
  fetchFilm(): void;
  fetchSpecies(): void;
  fetchVehicles(): void;
  fetchLocation(): void;
}

export interface ILocationDetailsProps extends IDefaultDetailsProps {
  allFilms: IFilm[],
  allSpecies: ISpecie[],
  allVehicles: IVehicle[],
  allPeople: IPerson[],
  fetchFilm(): void;
  fetchSpecies(): void;
  fetchVehicles(): void;
  fetchPeople(): void;
}

export interface ISpeciesDetailsProps extends IDefaultDetailsProps {
  allFilms: IFilm[],
  allLocations: ILocation[],
  allVehicles: IVehicle[],
  allPeople: IPerson[],
  fetchFilm(): void;
  fetchLocations(): void;
  fetchVehicles(): void;
  fetchPeople(): void;
}

export interface IVehiclesDetailsProps extends IDefaultDetailsProps {
  allFilms: IFilm[],
  allLocations: ILocation[],
  allSpecies: ISpecie[],
  allPeople: IPerson[],
  fetchFilm(): void;
  fetchLocations(): void;
  fetchSpecies(): void;
  fetchPeople(): void;
}
