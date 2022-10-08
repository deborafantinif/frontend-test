export interface IHeaderHomeProps {
  endpoint: string,
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

interface IDefaultProps {
  loading: boolean,
  error: string,
}

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

export interface IFilmsProps extends IDefaultProps {
  films: IFilm[],
  fetchFilms(): void,
}

export interface IFilmProps {
  film: IFilm,
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

export interface IPeopleProps extends IDefaultProps {
  people: IPerson[],
  fetchPeople(): void,
}

export interface IPersonProps {
  person: IPerson,
}

export interface ILocation {
  id: string,
  name: string,
  climate: string,
  terrain: string,
  surface_water: string,
  residents: string,
  films: string[],
  url: string,
}

export interface ILocationsProps extends IDefaultProps {
  locations: ILocation[],
  fetchLocations(): void,
}

export interface ILocationProps {
  location: ILocation,
}

export interface ISpecie {
  id: string,
  name: string,
  classification: string,
  eye_color: string,
  hair_color: string,
  people: string[],
  films: string[],
  url: string,
}

export interface ISpeciesProps extends IDefaultProps {
  species: ISpecie[],
  fetchSpecies(): void,
}

export interface ISpecieProps {
  specie: ISpecie,
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

export interface IVehiclesProps extends IDefaultProps {
  vehicles: IVehicle[],
  fetchVehicles(): void,
}

export interface IVehicleProps {
  vehicle: IVehicle,
}

export interface IDetails {
  endpoint: string,
}
